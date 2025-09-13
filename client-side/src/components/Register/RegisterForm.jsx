import React, { useState } from 'react';
import api from "../../api/api.jsx"
import { Link, useNavigate } from 'react-router-dom';
import './RegisterForm.css'; 

function RegisterForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !phone || !id || !password || !confirm) {
      setError("All fields are required");
      return;
    }

    if (password !== confirm) {
      setError("Password and Confirm Password do not match");
      return;
    }

    setLoading(true);

    try {
      setError('');
      const response = await api.post("/", {
        name,
        email,
        phone,
        id,
        password,
        confirm
      });

      if (response.data === "exist") {
        setError("User already exists");
      } else if (response.data.message === "User registered. Check your email for OTP.") {
        localStorage.setItem('userId', response.data.userId); 
        localStorage.setItem('userName', name);
        localStorage.setItem('email', email);
        localStorage.setItem('phone', phone);

        navigate("/verify-otp", { state: { email } });
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setError("An error occurred during registration. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = (value) => {
    const regex = /^(?=.*\d)(?=.*[!@#$%^&*])(?!.*\s).{5,15}$/;
    if (!regex.test(value)) {
      setPasswordError("Password must be between 5 to 15 characters, contain at least one number, one symbol, and no spaces");
    } else {
      setPasswordError("");
    }
    setPassword(value);
  };

  return (
      <div className="signup-box">
        <h2 className="signup-subtitle">SIGN UP</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
            required
          />

          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />

          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone Number"
            required
          />

          <input
            type="text"
            id="id"
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="ID Number"
            required
          />

          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => handlePasswordChange(e.target.value)}
            placeholder="Password"
            required
          />
          {passwordError && <p className="error-message">{passwordError}</p>}

          <input
            type="password"
            id="confirm"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="Confirm Password"
            required
          />

          {error && <p className="error-message">{error}</p>}

         <button type="submit" disabled={loading}>
          {loading ? (
            <div className="spinner-container">
              <div className="loading-spinner"></div>
            </div>
          ) : (
            'Sign up'
          )}
        </button>
        </form>

        <p className="login-link">
          Already Registered? <Link className='link' to='/'>Login</Link>
        </p>
      </div>
  );
}

export default RegisterForm;
