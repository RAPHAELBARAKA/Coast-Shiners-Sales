import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MyOrders.css'; // Import CSS for styling

function MyOrders() {
  const [orders, setOrders] = useState([]);

  // Fetch order data using axios
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('/api/orders'); // Replace with your API endpoint
        console.log('Orders data:', response.data);

        // Check if the data is an array and set it
        if (Array.isArray(response.data)) {
          setOrders(response.data);
        } else {
          console.error('Expected an array but got:', typeof response.data);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="orders-container">
      <h2>My Orders</h2>
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
            orders.map((order, index) => (
              <tr key={index}>
                <td>{order.orderNumber}</td>
                <td>{new Date(order.date).toLocaleDateString()}</td>
                <td>{order.items.map(item => item.name).join(', ')}</td>
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
    </div>
  );
}

export default MyOrders;
