import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

// Log the environment variable to debug
console.log('REACT_APP_API_URL from env:', process.env.REACT_APP_API_URL);
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:9000';
console.log('Using API_URL:', API_URL);

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const checkAuth = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/user`, { withCredentials: true });
        if (response.data.authenticated) {
          setUser(response.data.user);
        }
      } catch (error) {
        console.error('Authentication check failed:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.get(`${API_URL}/logout`, { withCredentials: true });
      setUser(null);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (loading) {
    return <div className="container">Loading...</div>;
  }

  return (
    <div className="container">
      {user ? (
        <Dashboard user={user} onLogout={handleLogout} />
      ) : (
        <Login apiUrl={API_URL} />
      )}
    </div>
  );
}

export default App; 