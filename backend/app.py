import os
from flask import Flask, request, jsonify, session, redirect, url_for
from flask_cors import CORS
from authlib.integrations.flask_client import OAuth
from dotenv import load_dotenv
import json

# Load environment variables
load_dotenv()

app = Flask(__name__)
app.secret_key = os.environ.get('SECRET_KEY') or os.urandom(24)
app.config['SESSION_TYPE'] = 'filesystem'
app.config['SESSION_PERMANENT'] = False
app.config['SESSION_USE_SIGNER'] = True

# Enable CORS
CORS(app, supports_credentials=True, resources={r"/*": {"origins": "*"}}, allow_headers=["Content-Type", "Authorization"])

# OAuth setup
oauth = OAuth(app)
client_id = os.environ.get('GOOGLE_CLIENT_ID')
client_secret = os.environ.get('GOOGLE_CLIENT_SECRET')
print(f"Using Google OAuth client ID: {client_id}")
print(f"Client secret first 5 chars: {client_secret[:5] if client_secret else 'None'}")

google = oauth.register(
    name='google',
    client_id=client_id,
    client_secret=client_secret,
    server_metadata_url='https://accounts.google.com/.well-known/openid-configuration',
    client_kwargs={'scope': 'openid email profile'},
)

# Routes
@app.route('/')
def index():
    return jsonify({"message": "Unit Converter API"})

@app.route('/login')
def login():
    redirect_uri = url_for('authorize', _external=True)
    print(f"Redirecting to Google with redirect URI: {redirect_uri}")
    return google.authorize_redirect(redirect_uri)

@app.route('/mock-auth')
def mock_auth():
    # Create a mock user for development
    mock_user = {
        'name': 'Test User',
        'email': 'test@example.com',
        'picture': 'https://ui-avatars.com/api/?name=Test+User'
    }
    session['user'] = mock_user
    return redirect(os.environ.get('FRONTEND_URL', 'http://localhost:3000'))

@app.route('/authorize')
def authorize():
    # Check if code is in request args
    if 'code' not in request.args:
        print("No code in request args - this is likely a direct access to /authorize")
        return "Authorization code not found in request.", 400
    
    try:
        print(f"Received authorization code, exchanging for token")
        token = google.authorize_access_token()
        print(f"Token received, getting user info")
        resp = google.get('https://openidconnect.googleapis.com/v1/userinfo')
        user_info = resp.json()
        print(f"User info received: {user_info.get('email')}")
        # Save user info in session
        session['user'] = user_info
        # Redirect to frontend
        return redirect(os.environ.get('FRONTEND_URL', 'http://localhost:3000'))
    except Exception as e:
        print(f"OAuth error: {e}")
        return f"OAuth error: {e}", 400

@app.route('/logout')
def logout():
    session.pop('user', None)
    return jsonify({"message": "Logged out successfully"})

@app.route('/api/user')
def get_user():
    user = session.get('user')
    if user:
        return jsonify({
            "authenticated": True,
            "user": {
                "name": user.get('name'),
                "email": user.get('email'),
                "picture": user.get('picture')
            }
        })
    return jsonify({"authenticated": False})

@app.route('/api/convert', methods=['POST'])
def convert():
    user = session.get('user')
    if not user:
        return jsonify({"error": "Authentication required"}), 401
    
    data = request.json
    if not data or 'value' not in data or 'unit' not in data:
        return jsonify({"error": "Missing required fields"}), 400
    
    try:
        value = float(data['value'])
        unit = data['unit']
        
        # Perform conversion (meters to feet)
        if unit == 'meters':
            result = value * 3.28084
            return jsonify({
                "original": {
                    "value": value,
                    "unit": "meters"
                },
                "converted": {
                    "value": result,
                    "unit": "feet"
                }
            })
        else:
            return jsonify({"error": f"Unsupported unit: {unit}"}), 400
            
    except ValueError:
        return jsonify({"error": "Invalid numerical value"}), 400

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=int(os.environ.get('PORT', 9000))) 