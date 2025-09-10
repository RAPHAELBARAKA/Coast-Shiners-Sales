import React from 'react';
import RegisterForm from "../../../components/Register/RegisterForm";
import RegisterLogo from "../../../components/Register/RegisterLogo";
import './RegisterPage.css'; // Import your CSS file

const RegisterPage = () => {
  return (
    <div className="register-page-container">
      <div className="register-logo-container">
        <RegisterLogo />
      </div>
      <div className="register-form-container">
        <RegisterForm />
      </div>
    </div>
  );
}

export default RegisterPage;
