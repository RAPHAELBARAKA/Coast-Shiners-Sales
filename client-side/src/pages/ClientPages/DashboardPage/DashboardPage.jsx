import React, { useState,useEffect } from 'react';
import Sidebar from "../../../components/SideBar/SideBar"; 
import TopNav from '../../../components/Client/TopNav/TopNav'; 
import './DashboardPage.css'; 
import PopularItems from '../../../components/Client/PopularItems/PopularItems';
import MyOrders from '../../../components/Client/MyOrders/MyOrders';

const DashboardPage = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [userName, setUserName] = useState('');
  const [lastLogin, setLastLogin] = useState('');


  const toggleSidebar = () => {
    setIsSidebarCollapsed(prevState => !prevState);
  };
  useEffect(() => {
    
    const storedName = localStorage.getItem('userName');
    const storedLastLogin = localStorage.getItem('lastLogin');

    if (storedLastLogin) setLastLogin(storedLastLogin);

    if (storedName) {
      setUserName(storedName);
    }
  }, []);


  return (
    <div className={`dashboard-grid ${isSidebarCollapsed ? 'collapsed' : ''}`}>
      {/* Sidebar on the left */}
      <div className="sidebar">
        <Sidebar onToggleSidebar={toggleSidebar} isCollapsed={isSidebarCollapsed} />
      </div>

      {/* Main content on the right */}
      <div className="main-content">
        {/* Top section with TopNav */}
        <div className="top-section">
          <TopNav />
        </div>

         {/* Center section */}
         <div className="center-section">
          <div className="greetings">
          <div className="welcome">
            {/* Your greetings content */}
            Welcome, {userName}!        
            </div>
          <div className="login">
            {/* Your greetings content */}
          Last Login: {lastLogin}    
           </div>      
           </div>
          
          <div className="popular">
            {/* Your popular content */}
            <PopularItems/>
          </div>
          <div className="my-orders">
            {/* Your my orders content */}
            <MyOrders/>
          </div>
        </div>

        {/* Bottom section (for bottom navigation) */}
        <div className="bottom-section">
        2024 , Copyright: Coast Shiners Sales
          </div>
      </div>
    </div>
  );
};

export default DashboardPage;
