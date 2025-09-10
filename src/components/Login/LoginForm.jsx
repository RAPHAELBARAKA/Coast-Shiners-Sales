import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginForm.css'; 
import api from "../../api/api.jsx"

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 
    setErrorMessage('');

    try {
      const response = await api.post('/login', { email, password });

      if (response.status === 200) {
        const { isAdmin, isbackoffice, lastLogin } = response.data;

        if (lastLogin) {
          localStorage.setItem('lastLogin', new Date(lastLogin).toLocaleString());
        }

        if (isAdmin) {
          navigate('/admin-dashboard');
        } else if (isbackoffice) {
          navigate('/backoffice-dash');
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
      if (error.response && error.response.status === 403) {
        setErrorMessage('Your account is not verified. Please check your email for the verification link.');
      } else {
        setErrorMessage('Login failed. Please check your credentials.');
      }
    }
    finally {
      setLoading(false); 
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
<button type="submit" className="login-button" disabled={loading}>
  {loading ? (
    <div className="spinner-container">
      <div className="loading-spinner"></div>
      <span>Logging in...</span>
    </div>
  ) : (
    'Login'
  )}
    </button>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
     </form>
      <div className="signup-link">
        <Link to="/register">Don't have an account? Sign Up</Link>
        <Link to="/forgot-password" className="login-forgot-password">
          Forgot password?
        </Link>
      </div>
    </div>
  );
}

export default Login;
