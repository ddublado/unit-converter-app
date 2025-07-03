import React from 'react';

function Login({ apiUrl }) {
  const handleLogin = () => {
    console.log('API URL:', apiUrl);
    console.log('Redirecting to:', `${apiUrl}/login`);
    // Force using port 9000 for testing
    window.location.href = 'http://localhost:9000/login';
  };

  return (
    <div className="card">
      <h1>Unit Converter</h1>
      <p>Please log in to use the unit converter.</p>
      <button className="btn" onClick={handleLogin}>
        Login with Google
      </button>
    </div>
  );
}

export default Login; 