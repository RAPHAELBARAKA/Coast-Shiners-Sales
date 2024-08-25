import React, { useState, useEffect } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import './OnePopular.css'; // Import the CSS file

function OnePopular() {
  const { popular } = useParams(); // Get the popular name from the URL
  const location = useLocation(); // Get the state passed during navigation
  const { image, description, price } = location.state; // Extract image, description, and price from state
  const navigate = useNavigate(); // For navigation

  // State to capture the inputs from the customer
  const [size, setSize] = useState('');
  const [color, setColor] = useState('');
  const [quantity, setQuantity] = useState(1); // Default quantity is 1
  const [totalPrice, setTotalPrice] = useState(price); // Total price state

  // Update the total price whenever the quantity changes
  useEffect(() => {
    setTotalPrice(price * quantity);
  }, [quantity, price]);

  const incrementQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const decrementQuantity = () => {
    setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1)); // Ensure quantity doesn't go below 1
  };

  const addToCart = () => {
    const item = { image, description, price, size, color, quantity, totalPrice };
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(item);
    localStorage.setItem('cart', JSON.stringify(cart));
    navigate('/cart'); // Navigate to the cart page
  };

  return (
    <div className="one-popular-container">
      <div className="one-popular-box">
        <div className="popular-image">
          <h2 className="popular-category">{popular} - Category</h2>
          <img src={image} alt={popular} />
        </div>
        <div className="popular-details">
          <p className="popular-description">{description}</p>
          
          {/* Table for Price, Size, Color, and Quantity */}
          <table className="popular-details-table">
            <tbody>
              <tr>
                <td>Price (per item):</td>
                <td>Ksh:{price}</td>
              </tr>
              <tr>
                <td>Size:</td>
                <td>
                  <input 
                    type="text" 
                    value={size} 
                    onChange={(e) => setSize(e.target.value)} 
                    placeholder="Enter size"
                  />
                </td>
              </tr>
              <tr>
                <td>Color:</td>
                <td>
                  <input 
                    type="text" 
                    value={color} 
                    onChange={(e) => setColor(e.target.value)} 
                    placeholder="Enter color"
                  />
                </td>
              </tr>
              <tr>
                <td>Quantity:</td>
                <td>
                  <div className="quantity-controls">
                    <button onClick={decrementQuantity} className="quantity-button">-</button>
                    <span className="quantity-display">{quantity}</span>
                    <button onClick={incrementQuantity} className="quantity-button">+</button>
                    <button onClick={addToCart} className="add">ADD TO CART</button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>Total Price:</td>
                <td>Ksh:{totalPrice}</td>
              </tr>
            </tbody>
          </table>
          
        </div>
      </div>
    </div>
  );
}

export default OnePopular;
