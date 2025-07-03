# Unit Converter Backend

A Flask-based backend for the Unit Converter application with Google OAuth authentication.

## Setup

1. Create a virtual environment:
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

3. Create a `.env` file based on `env.example` and add your Google OAuth credentials.

4. Run the application:
   ```
   python app.py
   ```

## API Endpoints

- `GET /`: API info
- `GET /login`: Google OAuth login
- `GET /authorize`: OAuth callback
- `GET /logout`: Log out user
- `GET /api/user`: Get current user info
- `POST /api/convert`: Convert units (requires authentication)
  - Request body: `{ "value": number, "unit": "meters" }`
  - Response: Converted value in feet 