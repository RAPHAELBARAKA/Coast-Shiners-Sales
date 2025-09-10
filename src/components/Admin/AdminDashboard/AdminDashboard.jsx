import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const navigate = useNavigate();

  const handleNavigateToOrders = () => {
    navigate('/admin-orders'); // Replace '/bookings' with the actual path to your bookings page
  };
  const handleNavigateToRegistration = () => {
    navigate('/register-user'); // Replace '/bookings' with the actual path to your bookings page
  };
  const handleNavigateToItemManagement = () => {
    navigate('/item-management'); // Replace '/bookings' with the actual path to your bookings page
  };
 const handleNavigateToServicePayment = () => {
  navigate('/servicepayment');
};

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Welcome, Admin!</p>
      <ul>
        <li>Manage users</li>
        <li>View appointments</li>
        <li>Generate reports</li>
      </ul>
      <button onClick={handleNavigateToOrders}>Go to orders</button><br/><br/>
      <button onClick={handleNavigateToRegistration }>Register a User</button><br/><br/>
      <button onClick={handleNavigateToItemManagement }>Item-management</button><br/><br/>
      <button onClick={handleNavigateToServicePayment }>Service payment</button>
    </div>
  );
}

export default AdminDashboard;
