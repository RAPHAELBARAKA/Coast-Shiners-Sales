import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cart.css';
import api from "../../../api/api.jsx";

function Cart() {
  const [cart, setCart] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState(''); // Changed from name to userName
  const [phone, setPhone] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
    const total = storedCart.reduce((sum, item) => sum + item.totalPrice, 0);
    setTotalAmount(total);
    const storedEmail = localStorage.getItem('email') || '';
    setEmail(storedEmail);
    const storedUserName = localStorage.getItem('userName') || ''; // Changed from storedName to storedUserName
    setUserName(storedUserName);
    const storedPhone = localStorage.getItem('phone') || '';
    setPhone(storedPhone);
  }, []);

  const removeItem = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    const total = updatedCart.reduce((sum, item) => sum + item.totalPrice, 0);
    setTotalAmount(total);
  };

  const handlePlaceOrder = async () => {
    console.log('Place Order button clicked');

    // Check if the cart is empty
    if (cart.length === 0) {
      alert('Your cart is empty. Please add items to the cart.');
      return;
    }

    // Check if required user details are provided
    if (!email || !userName || !phone) {
      alert('Please provide your email, username, and phone number.');
      return;
    }

    try {
      const orderData = {
        itemCount: cart.length,
        totalAmount: totalAmount,
        email: email,
        userName: userName,
        phone: phone,
        items: cart.map((item) => ({
          description: item.description,
          size: item.size,
          color: item.color,
          quantity: item.quantity,
          price: item.totalPrice
        }))
      };

      // Logging the order data to inspect it before sending
      console.log('Order Data:', orderData);

      const response = await api.post('place-order', orderData, {
        headers: { 'Content-Type': 'application/json' },  // Change Content-Type to application/json
      });

      console.log(response.data);
      alert('Order placed successfully');
      setCart([]);
      localStorage.removeItem('cart');
      navigate('/payment', { state: { totalAmount, cart } });  // Navigate to payment page after placing order
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Error placing order');
    }
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      <table className="cart-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Size</th>
            <th>Color</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cart.length === 0 ? (
            <tr>
              <td colSpan="6" style={{ textAlign: 'center' }}>
                Your cart is empty. Please add items to the cart.
              </td>
            </tr>
          ) : (
            cart.map((item, index) => (
              <tr key={index}>
                <td>{item.description}</td>
                <td>{item.size}</td>
                <td>{item.color}</td>
                <td>{item.quantity}</td>
                <td>{item.totalPrice}</td>
                <td><button onClick={() => removeItem(index)}>Remove</button></td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div className="total-container">
        <p>Total Amount: {totalAmount}</p>
        <button onClick={handlePlaceOrder}>Place Order</button>
      </div>
    </div>
  );
}

export default Cart;
