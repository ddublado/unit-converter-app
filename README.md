# Unit Converter App

A full-stack web application that allows users to log in using Google OAuth, enter a numerical value, and view a converted result calculated securely on the server.

## Tech Stack

- **Backend**: Python (Flask)
- **Frontend**: JavaScript (React)
- **Authentication**: Google OAuth
- **Deployment**: Ready for deployment on JetBrains Space, Heroku, or similar platforms

## Features

- Secure authentication with Google OAuth
- Server-side unit conversion (meters to feet)
- Clean and responsive UI
- Input validation
- User profile display
- Logout functionality

## Project Structure

- `/backend`: Flask server with Google OAuth and conversion logic
- `/frontend`: React application with user interface

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Create a virtual environment:
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

4. Create a `.env` file based on `env.example` and add your Google OAuth credentials.

5. Run the Flask server:
   ```
   python app.py
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file:
   ```
   REACT_APP_API_URL=http://localhost:5000
   ```

4. Start the React development server:
   ```
   npm start
   ```

## Deployment

For production deployment:

1. Set up Google OAuth credentials for your production domain
2. Deploy the backend to a service like Heroku, JetBrains Space, or similar
3. Build the frontend with `npm run build` and deploy the static files
4. Update environment variables for production URLs

## User Flow

1. User logs in with Google
2. User sees welcome message with their name
3. User enters a numerical value in meters
4. User clicks "Calculate" button
5. Server converts the value to feet
6. Result is displayed to the user
7. User can log out when finished 