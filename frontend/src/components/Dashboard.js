import React, { useState } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function Dashboard({ user, onLogout }) {
  const [value, setValue] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Validate input
    if (!value || isNaN(parseFloat(value))) {
      setError('Please enter a valid number');
      return;
    }
    
    setLoading(true);
    
    try {
      const response = await axios.post(
        `${API_URL}/api/convert`, 
        { value: parseFloat(value), unit: 'meters' },
        { withCredentials: true }
      );
      
      setResult(response.data);
    } catch (error) {
      console.error('Conversion failed:', error);
      setError('Failed to convert value. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="header">
        <h1>Unit Converter</h1>
        <div className="user-info">
          {user.picture && <img src={user.picture} alt="Profile" />}
          <div>
            <div>{user.name}</div>
            <div style={{ fontSize: '0.9em', color: '#666' }}>{user.email}</div>
          </div>
          <button className="btn btn-secondary" onClick={onLogout} style={{ marginLeft: '10px' }}>
            Logout
          </button>
        </div>
      </div>
      
      <div className="card">
        <h2>Convert Meters to Feet</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="value">Value in Meters:</label>
            <input
              type="number"
              id="value"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter a value in meters"
              step="any"
              required
            />
            {error && <div className="error">{error}</div>}
          </div>
          <button type="submit" className="btn" disabled={loading}>
            {loading ? 'Converting...' : 'Calculate'}
          </button>
        </form>
        
        {result && (
          <div className="result">
            {result.original.value} {result.original.unit} = {result.converted.value.toFixed(2)} {result.converted.unit}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard; 