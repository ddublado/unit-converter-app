import React from 'react';

function Login({ apiUrl }) {
  const handleLogin = () => {
    console.log('API URL:', apiUrl);
    console.log('Redirecting to:', `${apiUrl}/login`);
    window.location.href = `${apiUrl}/login`;
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