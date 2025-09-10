import React, { useState, useEffect } from 'react';
import api from "../../../api/api.jsx";
import './FoodItems.css'; // Import the CSS file
import arrow from '../../../assets/arrow.png';
import { useNavigate } from 'react-router-dom';

function FoodItems() {
    const [foodItems, setFoodItems] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Initialize navigate
  
    useEffect(() => {
      const fetchFoodItems = async () => {
        try {
          // Fetch all items with code=1 (food items)
          const response = await api.get('/get-all-items', { params: { code: 1 } });
          const items = response.data;
  
          if (Array.isArray(items)) {
            setFoodItems(items);
          } else {
            console.error('Expected an array but got:', typeof items);
          }
        } catch (error) {
          setError('Error fetching food items');
          console.error('Error fetching food items:', error);
        }
      };
  
      fetchFoodItems();
    }, []);
  
    const handleClick = (image, description, price,name) => {
      // Carry all necessary data (image, description, and price) without displaying them
      console.log(`Selected item details: ${image}, ${description}, ${price}`);
      // Navigate to the next page with the image, description, and price in state
      navigate(`/popular/food`, { state: { image, description, price,name } });
    };
  
    return (
      <div className="food-items-container">
        <h2 className="food-items-heading">Food Items</h2>
        <div className="food-items-grid">
          {foodItems.length > 0 ? (
            foodItems.map((item, index) => (
              <div
                key={index}
                className="food-item-box"
                onClick={() => handleClick(
                  `http://localhost:3000/${item.image}`, 
                  item.description, 
                  item.price
                )}
              >
                  <h4 className="item-name">{item.name}</h4>

              <div className="item-image-container">
                  <img src={`http://localhost:3000/${item.image}`} alt="Food" className="item-image" />
                </div>
                <ul className="view">
                  <p>view</p>
                  <img src={arrow} alt="arrow" />
                </ul>
              </div>
            ))
          ) : (
            <p>No popular food items available</p>
          )}
        </div>
      </div>
    );
}

export default FoodItems;
