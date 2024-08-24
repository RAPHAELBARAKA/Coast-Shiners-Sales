import React from 'react';
import ForgotPassword from "../../../components/ForgotPassword/ForgotPassword";
import RegisterLogo from '../../../components/Register/RegisterLogo';
import "./ForgotPasswordPage.css";

function ForgotPasswordPage() {
  return (
    <div className="forgotpassword-page-container">
      <div className="forgotpassword-logo-container">
        <RegisterLogo />
      </div>
      <div className="forgotpassword-container">
        <ForgotPassword />
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
