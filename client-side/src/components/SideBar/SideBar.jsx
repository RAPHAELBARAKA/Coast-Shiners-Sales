import React from 'react';
import './Sidebar.css'; // Import normal CSS file
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { useNavigate } from 'react-router-dom'; // React Router for navigation

import homeIcon from '../../assets/home.png';
import foodIcon from '../../assets/food.png';
import householdIcon from '../../assets/household.png';
import clothingIcon from '../../assets/clothing.png';
import officeIcon from '../../assets/office.png';
import electronicsIcon from '../../assets/electronics.png';
import healthIcon from '../../assets/health.png';
import logoutIcon from '../../assets/logout.png';

const SideBar = ({ onToggleSidebar, isCollapsed }) => {
  const navigate = useNavigate();

  return (
    <div className="sidebar_wrapper">
      <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
        <button className="btn" onClick={onToggleSidebar}>
          {isCollapsed ? <MdKeyboardArrowRight /> : <MdKeyboardArrowLeft />}
        </button>

        <ul className="nav_links">
          <li className="dashboard" onClick={() => navigate('/dashboard')}>
            <img src={homeIcon} alt="Dashboard" width={20} height={20} />
            {!isCollapsed && <p>Dashboard</p>}
          </li>
          <li onClick={() => navigate('/food')}>
            <img src={foodIcon} alt="Food Category" width={20} height={20} />
            {!isCollapsed && <p>Food Category</p>}
          </li>
          <li onClick={() => navigate('/household')}>
            <img src={householdIcon} alt="Household Items" width={20} height={20} />
            {!isCollapsed && <p>Household Items</p>}
          </li>
          <li onClick={() => navigate('/clothing')}>
            <img src={clothingIcon} alt="Clothing and Fashion" width={20} height={20} />
            {!isCollapsed && <p>Clothing and Fashion</p>}
          </li>
          <li onClick={() => navigate('/office')}>
            <img src={officeIcon} alt="Office Items" width={20} height={20} />
            {!isCollapsed && <p>Office Items</p>}
          </li>
          <li onClick={() => navigate('/electronics')}>
            <img src={electronicsIcon} alt="Electronics" width={20} height={20} />
            {!isCollapsed && <p>Electronics</p>}
          </li>
          <li onClick={() => navigate('/health')}>
            <img src={healthIcon} alt="Healthcare and Beauty" width={20} height={20} />
            {!isCollapsed && <p>Healthcare and Beauty</p>}
          </li>
        </ul>
		<li className="logout" onClick={() => navigate('/')}>
            <img src={logoutIcon} alt="Logout" width={20} height={20} />
            {!isCollapsed && <p>Logout</p>}
          </li>
      </aside>
    </div>
  );
};

export default SideBar;
