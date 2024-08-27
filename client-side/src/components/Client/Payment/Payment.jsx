import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './Payment.css'; // Assuming you have a separate CSS file for styling

function Payment() {
  const location = useLocation();
  const { cart, totalAmount } = location.state || {}; // Get the cart and total amount passed from the Cart component

  const [phoneNumber, setPhoneNumber] = useState('');

  const initiatePayment = () => {
    axios.post('https://coast-shiners-sales-3.onrender.com/initiate-payment', {
      phoneNumber: phoneNumber,
      amount: totalAmount
    })
    .then(response => {
      console.log('Payment initiation successful:', response.data);
      // Handle further action as required
    })
    .catch(error => {
      console.error('Error initiating M-Pesa payment:', error);
      alert('Failed to initiate M-Pesa payment. Please try again.');
    });
  };

  return (
    <div className="payment-container">
      <div className="payment-card">
        <h4 className="billing-title">Payment Information</h4>
        <div>
          <h4 >Description:</h4>
          <ul>
            {cart && cart.map((item, index) => (
              <li key={index}>
                {item.description}
              </li>
            ))}
          </ul>
          <p className="service-info">Total Amount: Ksh:{totalAmount}</p>
        </div>

        <input
          className="phone-input"
          type="text"
          placeholder="Enter Mpesa-phone number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />

        <button
          className="pay-button"
          onClick={initiatePayment}
        >
          Pay with M-Pesa
        </button>
      </div>
    </div>
  );
}

export default Payment;
