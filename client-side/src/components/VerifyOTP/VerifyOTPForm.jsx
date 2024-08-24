import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import './VerifyOTPForm.css'; // Import the CSS file for styles

function VerifyOTPForm() {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email || '';

  const handleInputChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setVerifyLoading(true);

    try {
      const enteredOTP = otp.join('');
      const response = await axios.post("http://localhost:3000/verify-otp", { enteredOTP });

      if (response.status === 200) {
        navigate('/login');
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      alert("An error occurred during OTP verification. Please try again later.");
    }

    setVerifyLoading(false);
  };

  const handleResendOTP = async () => {
    try {
      setResendLoading(true);
      const response = await axios.post("http://localhost:3000/resend-otp", { email });

      if (response.status === 200) {
        alert(response.data.message);
      } else {
        alert("Failed to resend OTP. Please try again later.");
      }
    } catch (error) {
      console.error("Error resending OTP:", error);
      alert("An error occurred while resending OTP. Please try again later.");
    }

    setResendLoading(false);
  };

  return (
    <div className="form-container">
      <h2 className="subtitle">OTP Verification</h2>
      <p className="instruction">
        A verification code has been sent to <span className="email">{email}</span>. If the email address is incorrect, you can go back and change it.
      </p>
      <p className="instruction">Enter OTP sent to your device here</p>
      <form onSubmit={handleVerifyOTP} className="otp-form">
        <div className="otp-inputs">
          {otp.map((value, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              value={value}
              onChange={(e) => handleInputChange(index, e.target.value)}
              id={`otp-${index}`}
              className="otp-input"
            />
          ))}
        </div>

        {/* Button container using flexbox to align both buttons */}
        <div className="button-container">
          <button type="submit" className="verify-btn" disabled={verifyLoading}>
            {verifyLoading ? 'Verifying...' : 'Verify OTP'}
          </button>

          <button
            onClick={handleResendOTP}
            className="resend-btn"
            disabled={resendLoading}
          >
            {resendLoading ? 'Resending...' : 'RESEND OTP'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default VerifyOTPForm;
