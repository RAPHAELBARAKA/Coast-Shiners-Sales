import React, { useState,useEffect } from 'react';
import Sidebar from "../../../components/SideBar/SideBar"; // Sidebar component
import TopNav from '../../../components/Client/TopNav/TopNav'; // TopNav component
import '../DashboardPage/DashboardPage.css'; // Import the CSS file
import FoodItems from '../../../components/Client/FoodItems/FoodItems';
import ClothingItems from '../../../components/Client/Clothing/Clothing';

function ClothingPage() {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [userName, setUserName] = useState('');
    const [lastLogin, setLastLogin] = useState('');
  
  
    const toggleSidebar = () => {
      setIsSidebarCollapsed(prevState => !prevState);
    };
    useEffect(() => {
      // Retrieve the user's name from localStorage
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
            
            <div className="popular">
              {/* Your popular content */}
              <ClothingItems/>
            </div>
            <div className="my-orders">
              {/* Your my orders content */}
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

export default ClothingPage
