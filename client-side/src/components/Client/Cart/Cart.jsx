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
    try {
      const formData = new FormData();
      cart.forEach((item, index) => {
        formData.append(`description${index}`, item.description);
        formData.append(`size${index}`, item.size);
        formData.append(`color${index}`, item.color);
        formData.append(`quantity${index}`, item.quantity);
        formData.append(`price${index}`, item.totalPrice);
      });
      formData.append('totalAmount', totalAmount);
      formData.append('email', email);
      formData.append('userName', userName); // Updated to userName
      formData.append('phone', phone);

      // Log form data for debugging
      for (let pair of formData.entries()) {
        console.log(pair[0]+ ', ' + pair[1]);
      }

      const response = await api.post('/place-order', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert(response.data.message);

      console.log('Order placed successfully');
      localStorage.removeItem('cart');
      setCart([]);

      // Navigate to Payment page and pass cart details and totalAmount
      navigate('/payment', { state: { cart, totalAmount } });

    } catch (error) {
      console.error('Error placing the order:', error);
    }
  };

  return (
    <div className="cart-container">
      <h2>Cart</h2>
      {cart.length > 0 ? (
        <div>
          <table className="cart-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Description</th>
                <th>Size</th>
                <th>Color</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => (
                <tr key={index}>
                  <td>
                    {item.image ? (
                      <img src={item.image} alt={item.description} className="cart-image" />
                    ) : (
                      'No Image'
                    )}
                  </td>
                  <td className='description'>{item.description}</td>
                  <td>{item.size}</td>
                  <td>{item.color}</td>
                  <td>{item.quantity}</td>
                  <td>Ksh:{item.totalPrice}</td>
                  <td>
                    <button onClick={() => removeItem(index)} className="remove-button">Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="cart-total">
            <h3>Total Amount: Ksh:{totalAmount}</h3>
            <button onClick={handlePlaceOrder} className="place-order-button">Place Order</button>
          </div>
        </div>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
}

export default Cart;
