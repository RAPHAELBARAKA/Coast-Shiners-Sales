import React from 'react';
import LoginForm from "../../../components/Login/LoginForm";
import RegisterLogo from "../../../components/Register/RegisterLogo";
import './LoginPage.css'; // Assuming you have a CSS file for styling

const LoginPage = () => {
  return (
    <div className="login-page-container">
      <div className="login-logo-container">
        <RegisterLogo />
      </div>
      <div className="login-form-container">
        <LoginForm />
      </div>
    </div>
  );
}

export default LoginPage;
