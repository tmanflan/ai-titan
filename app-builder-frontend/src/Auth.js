import React, { useState } from 'react';
import './Auth.css'; // We will create this CSS file next

function Auth({ onAuthSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('');

    const endpoint = isLogin ? '/login' : '/register';
    try {
      const response = await fetch(`http://localhost:4000${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        if (isLogin) {
          onAuthSuccess(data.userId); // Pass userId to parent component
        }
      } else {
        setMessage(data.message || 'An error occurred');
      }
    } catch (error) {
      setMessage('Network error or server is down.');
      console.error('Auth error:', error);
    }
  };

  return (
    <div className="auth-container">
      <h2>{isLogin ? 'Login' : 'Register'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
      </form>
      <p className="toggle-auth">
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <span onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Register here' : 'Login here'}
        </span>
      </p>
      {message && <p className="auth-message">{message}</p>}
    </div>
  );
}

export default Auth;