import React from 'react';
import logo from '../../assets/logo.png'; 
import "./RegisterLogo.css"// Make sure the path to the logo is correct

function RegisterLogo() {
  return (
    <div className="register-logo">
      <img src={logo} alt="Logo" className="logo-image" />
    </div>
  );
}

export default RegisterLogo;
