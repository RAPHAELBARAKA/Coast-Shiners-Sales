import React, { useState, useEffect } from 'react';
import api from "../../../api/api.jsx";
import './Notification.css';

function NotificationBadge() {
  const [unreadCount, setUnreadCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);

  const userId = localStorage.getItem('userId'); 

  useEffect(() => {
    fetchNotificationCount();
    const interval = setInterval(fetchNotificationCount, 30000); 
    return () => clearInterval(interval);
  }, []);

  const fetchNotificationCount = async () => {
    try {
      if (!userId) {
        setError("User not logged in");
        return;
      }

      const response = await api.get(`/get-notifications/${userId}`);
      const data = response.data;

      setNotifications(data);
      const unread = data.filter(n => !n.isRead).length;
      setUnreadCount(unread);
      setError('');
    } catch (err) {
      console.error('Error fetching notification count:', err);
      setError('Failed to load notifications');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="notification-wrapper">
      <div 
        className={`notification-badge ${loading ? 'loading' : ''}`} 
        onClick={() => setOpen(!open)}
      >
        <i className="fas fa-bell"></i>
        {unreadCount > 0 && (
          <span className={`badge-count ${unreadCount > 9 ? 'large' : ''}`}>
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </div>
      {open && (
        <div className="notification-dropdown">
          <h4>Notifications</h4>
          {error && <div className="error-tooltip">{error}</div>}
          {notifications.length === 0 ? (
            <p>No notifications</p>
          ) : (
            notifications.map((n, index) => (
              <div key={index} className="notification-item">
                <p className="notification-message">{n.message}</p>
                <p className="notification-time">
                  {new Date(n.createdAt).toLocaleString()}
                </p>
              </div>
            ))
          )}
          <a href="/all-notifications" className="view-all">View All</a>
        </div>
      )}
    </div>
  );
}

export default NotificationBadge;
