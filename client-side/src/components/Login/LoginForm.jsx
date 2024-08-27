import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './LoginForm.css'; // Custom CSS file

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://coast-shiners-sales-3.onrender.com/login', {
        email,
        password
      });
 
      alert(response.data.message);
  
      if (response.status === 200) {
        if (response.data.isAdmin) {
          navigate('/admin-dashboard');
        } else if (response.data.isDoctor) {
          navigate('/doctor-dash'); // Assuming doctor dashboard route is '/doctor-dash'
        } else {
          if (rememberMe) {
            localStorage.setItem('rememberedEmail', email);
            localStorage.setItem('rememberedPassword', password);
          } else {
            localStorage.removeItem('rememberedEmail');
            localStorage.removeItem('rememberedPassword');
          }
          navigate('/dashboard');
        }
      }
    } catch (error) {
      setErrorMessage('Login failed. Please check your credentials.');
      console.error('Login Error:', error);
    }
  };

  return (
      <div className="login-box">
        <h1 className="login-title">LOGIN</h1>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="login-input"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="login-input"
            />
          </div>
          <button type="submit" className="login-button">Login</button>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
        </form>
        <div className="signup-link">
          <Link to="/">Don't have an account? Sign Up</Link>
          <Link to="/forgot-password" className="login-forgot-password">
              Forgot password?
            </Link>
        </div>
      </div>
  );
}

export default Login;
