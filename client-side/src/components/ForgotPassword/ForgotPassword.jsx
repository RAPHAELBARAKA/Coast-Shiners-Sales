import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from "../../api/api.jsx"
import './ForgotPassword.css'; // Import custom CSS for styling

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 
    try {
      const response = await api.post('/password-otp', {
        email
      });
  
      alert(response.data.message);
  
      if (response.status === 200) {
        navigate('/verify-passotp', { state: { email } });
      }
    } catch (error) {
      alert('Password reset failed. Please check your email.');
      console.error('Password Reset Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="forgot-password-box">
        <h2 className="forgot-password-title">REQUEST VERIFICATION CODE</h2>
        <p className="forgot-password-text">Enter your email address to receive a Verification Code</p>
        <form onSubmit={handleSubmit}>
          <input
            className="forgot-password-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
          <button
            className="forgot-password-button"
            type="submit"
          >
            {loading ? 'Loading...' : 'Get code'}
          </button>
        </form>
      </div>
  );
}

export default ForgotPassword;
