import React, { useState, useEffect } from 'react';
import api from "../../../api/api.jsx";
import './AdminOrders.css'; // Import CSS for styling

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [showAll, setShowAll] = useState(false); // Track whether to show all rows

  // Function to fetch orders
  const fetchOrders = async () => {
    try {
      const response = await api.get('/all/orders');
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

  // Fetch orders on component mount
  useEffect(() => {
    fetchOrders();
  }, []);

  // Toggle between showing all orders or just one
  const toggleShowAll = () => {
    setShowAll(prevShowAll => !prevShowAll);
  };

  const handleApprove = async (orderId) => {
    console.log(`Attempting to approve order with ID: ${orderId}`);
    try {
      const response = await api.put(`/orders/${orderId}/approve`);
      if (response.status === 200) {
        console.log('Order approved successfully');
        fetchOrders();
      }
    } catch (error) {
      console.error('Error approving order:', error.response ? error.response.data : error.message);
    }
  };
  
  // Handle cancelling an order
  const handleCancel = async (orderId) => {
    try {
      const response = await api.put(`/orders/${orderId}/cancel`);
      if (response.status === 200) {
        fetchOrders(); // Re-fetch orders after cancellation
      }
    } catch (error) {
      console.error('Error cancelling order:', error.response ? error.response.data : error.message);
    }
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
            <th>Orderd-By</th>
            <th>Phone</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            orders.slice(0, showAll ? orders.length : 1).map((order, index) => (
              <tr key={index}>
                <td>{order.orderNumber}</td>
                <td>{new Date(order.orderDate).toLocaleDateString('en-GB')}</td>
                <td>
                  {order.items && order.items.length > 0 ? (
                    order.items.map((item, index) => (
                      <div key={index} className="item-description">
                        {item.description}
                      </div>
                    ))
                  ) : (
                    <div>No items</div>
                  )}
                </td>
                <td>
                {order.items && order.items.length > 0 ? (
                    order.items.map((item, index) => (
                      <div key={index} className="item-description">
                        {item.quantity}
                      </div>
                    ))
                  ) : (
                    <div>No items</div>
                  )}                </td>
                <td>{order.userName}</td>
                <td>{order.userPhone}</td>
                <td>{order.status}</td>
                <td>
              <button 
                onClick={() => handleApprove(order._id)} 
                disabled={order.status === 'Approved'}
                style={{ marginRight: '10px' }}

              >
                Approve
                
              </button>
            
              <button 
                onClick={() => handleCancel(order._id)} 
                disabled={order.status == 'Cancelled'}
              >
                Cancel
              </button>
            </td>                                   

              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">No orders found</td>
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

export default AdminOrders;
