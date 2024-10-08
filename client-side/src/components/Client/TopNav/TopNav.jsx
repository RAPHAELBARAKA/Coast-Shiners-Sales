import React from 'react';
import './TopNav.css'; // Importing the CSS file
import logo from '../../../assets/logo.png';
import bell from '../../../assets/bell.png';
import image from '../../../assets/image.png'

function TopNav() {
  return (
    <div className="topnav">
      <div className="topnav-logo">
        <img src={logo} alt="Logo" />
      </div>
      <div className="topnav-icons">
        <img src={bell} alt="Notification Bell" className="icon" />
        <img src={image} alt="Profile" className="icon profile-icon" />
      </div>
    </div>
  );
}

export default TopNav;
