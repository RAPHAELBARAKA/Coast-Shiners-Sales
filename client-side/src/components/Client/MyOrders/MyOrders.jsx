import React, { useState, useEffect } from 'react';
import api from "../../../api/api.jsx";
import './MyOrders.css'; // Import CSS for styling

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [showAll, setShowAll] = useState(false); // Track whether to show all rows

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Get email from local storage
        const storedEmail = localStorage.getItem('email') || '';

        console.log('Stored Email:', storedEmail); // Debugging line

        // Fetch orders based on email
        if (!storedEmail) {
          console.error('Email is not available in local storage');
          return;
        }

        const response = await api.get('/api/orders', { params: { email: storedEmail } });
        console.log('Orders data:', response.data);

        if (Array.isArray(response.data)) {
          const sortedOrders = response.data.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
          setOrders(sortedOrders);
        } else {
          console.error('Expected an array but got:', typeof response.data);
        }
      } catch (error) {
        console.error('Error fetching orders:', error.response ? error.response.data : error.message);
      }
    };

    fetchOrders();
  }, []); // Empty dependency array ensures this runs only once on mount

  const toggleShowAll = () => {
    setShowAll(!showAll); // Toggle the visibility of the full list
  };

  return (
    <div className="orders-container">
      <h3>My Recent Orders</h3>
      <table className="orders-table">
        <thead>
          <tr>
            <th>Order Number</th>
            <th>Date</th>
            <th>Item(s) Ordered</th>
            <th>Quantity</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            // Display only the first two rows unless showAll is true
            orders.slice(0, showAll ? orders.length : 1).map((order, index) => (
              <tr key={index}>
                <td>{order.orderNumber}</td>
                <td>{new Date(order.orderDate).toLocaleDateString('en-GB')}</td>
                <td>
                  {order.items.map((item, index) => (
                    <div key={index} className="item-description">
                      {item.description}
                    </div>
                  ))}
                </td>
                <td>{order.items.reduce((total, item) => total + item.quantity, 0)}</td>
                <td>{order.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No orders found</td>
            </tr>
          )}
        </tbody>
      </table>

      {orders.length > 1 && (
        <div className="toggle-show-all" onClick={toggleShowAll}>
          {showAll ? 'See Less' : 'Click to see All orders'} &#9660;
        </div>
      )}
    </div>
  );
}

export default MyOrders;
