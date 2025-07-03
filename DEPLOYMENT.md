# Deployment Guide

This guide provides instructions for deploying the Unit Converter application to various platforms.

## Prerequisites

1. Google OAuth credentials
   - Create a project in the [Google Developer Console](https://console.developers.google.com/)
   - Set up OAuth consent screen
   - Create OAuth 2.0 Client ID
   - Add authorized redirect URIs (e.g., `https://your-domain.com/authorize`)

2. Environment variables
   - Backend:
     - `SECRET_KEY`: A secure random string for session encryption
     - `GOOGLE_CLIENT_ID`: Your Google OAuth client ID
     - `GOOGLE_CLIENT_SECRET`: Your Google OAuth client secret
     - `FRONTEND_URL`: URL of your frontend application
   - Frontend:
     - `REACT_APP_API_URL`: URL of your backend API

## Heroku Deployment

### Backend Deployment

1. Create a `Procfile` in the backend directory:
   ```
   web: gunicorn app:app
   ```

2. Add `gunicorn` to `requirements.txt`

3. Create a new Heroku app:
   ```
   heroku create unit-converter-backend
   ```

4. Set environment variables:
   ```
   heroku config:set SECRET_KEY=your_secret_key
   heroku config:set GOOGLE_CLIENT_ID=your_client_id
   heroku config:set GOOGLE_CLIENT_SECRET=your_client_secret
   heroku config:set FRONTEND_URL=https://your-frontend-url.com
   ```

5. Deploy the backend:
   ```
   git subtree push --prefix backend heroku main
   ```

### Frontend Deployment

1. Build the React app:
   ```
   cd frontend
   npm run build
   ```

2. Deploy to Heroku or any static hosting service (Netlify, Vercel, etc.)
   - For Heroku, you can use the [create-react-app buildpack](https://github.com/mars/create-react-app-buildpack)

## JetBrains Space Deployment

1. Create a new project in JetBrains Space

2. Set up a deployment pipeline using the Space Automation features:
   - Build backend Docker image
   - Build frontend static files
   - Deploy both services

3. Configure environment variables in the JetBrains Space deployment settings

## Docker Deployment

1. Create a `Dockerfile` for the backend:
   ```dockerfile
   FROM python:3.9-slim
   
   WORKDIR /app
   
   COPY requirements.txt .
   RUN pip install --no-cache-dir -r requirements.txt
   
   COPY . .
   
   CMD ["gunicorn", "-b", "0.0.0.0:5000", "app:app"]
   ```

2. Create a `Dockerfile` for the frontend:
   ```dockerfile
   FROM node:16-alpine as build
   
   WORKDIR /app
   
   COPY package*.json ./
   RUN npm install
   
   COPY . .
   RUN npm run build
   
   FROM nginx:alpine
   COPY --from=build /app/build /usr/share/nginx/html
   COPY nginx.conf /etc/nginx/conf.d/default.conf
   
   EXPOSE 80
   
   CMD ["nginx", "-g", "daemon off;"]
   ```

3. Create a `docker-compose.yml` file:
   ```yaml
   version: '3'
   
   services:
     backend:
       build: ./backend
       ports:
         - "5000:5000"
       environment:
         - SECRET_KEY=your_secret_key
         - GOOGLE_CLIENT_ID=your_client_id
         - GOOGLE_CLIENT_SECRET=your_client_secret
         - FRONTEND_URL=http://localhost:3000
   
     frontend:
       build: ./frontend
       ports:
         - "3000:80"
       depends_on:
         - backend
   ```

4. Run with Docker Compose:
   ```
   docker-compose up -d
   ``` 