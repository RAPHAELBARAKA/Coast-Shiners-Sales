import React, { useState } from 'react';
import Sidebar from "../../../components/SideBar/SideBar"; // Sidebar component
import TopNav from '../../../components/Client/TopNav/TopNav'; // TopNav component
import '../DashboardPage/DashboardPage.css'; // Import the CSS file
import "./OnePopularPage.css"

import OnePopular from '../../../components/Client/OnePopular/OnePOpular'

function OnePopularPage() {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    const toggleSidebar = () => {
      setIsSidebarCollapsed(prevState => !prevState);
    };
  
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
            <div className='popular-item'>
            <OnePopular/>
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

export default OnePopularPage
