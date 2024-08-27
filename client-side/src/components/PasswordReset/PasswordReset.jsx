import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './PasswordReset.css'; // Import the custom CSS file

function PasswordReset() {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const [passwordError, setPasswordError] = useState('');

  const handlePasswordChange = (value) => {
    // Check password requirements
    const regex = /^(?=.*\d)(?=.*[!@#$%^&*])(?!.*\s).{5,15}$/;
    if (!regex.test(value)) {
      setPasswordError("Password must be between 5 to 15 characters, contain at least one number, one symbol, and no spaces");
    } else {
      setPasswordError("");
    }

    setNewPassword(value);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post('https://coast-shiners-sales-3.onrender.com/resetpassword', {
        email,
        newPassword,
      });

      setSuccessMessage(response.data.message);
      navigate('/login');
    } catch (error) {
      console.error('Error resetting password:', error.response.data);
      setError(error.response.data.message || 'An error occurred while resetting password.');
    }

    setLoading(false);
  };

  return (
      <div className="password-reset-box">
        <h3 className="logo-text">Reset Password</h3>
        <form onSubmit={handleResetPassword}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="input-field"
          />
          <input
            type="password"
            value={newPassword}
            onChange={(e) => handlePasswordChange(e.target.value)}
            placeholder="New Password"
            required
            className="input-field"
          />
          {passwordError && <p className="error-text">{passwordError}</p>}
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm New Password"
            required
            className="input-field"
          />
          <button
            type="submit"
            className="submit-button"
            disabled={loading}
          >
            {loading ? 'Resetting...' : 'Reset'}
          </button>
        </form>
        {error && <p className="error-text">{error}</p>}
        {successMessage && <p className="success-text">{successMessage}</p>}
      </div>
  );
}

export default PasswordReset;
