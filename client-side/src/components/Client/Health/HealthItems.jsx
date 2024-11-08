import React, { useState, useEffect } from 'react';
import api from "../../../api/api.jsx";
import './HealthItems.css'; // Updated CSS file import
import arrow from '../../../assets/arrow.png';
import { useNavigate } from 'react-router-dom';

function HealthItems() { // Updated component name
    const [healthItems, setHealthItems] = useState([]); // Updated state name
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Initialize navigate
  
    useEffect(() => {
      const fetchHealthItems = async () => { // Updated function name
        try {
          // Fetch all items with code=5 (health items)
          const response = await api.get('/get-all-items', { params: { code: 6 } });
          const items = response.data;
  
          if (Array.isArray(items)) {
            setHealthItems(items); // Updated state setting
          } else {
            console.error('Expected an array but got:', typeof items);
          }
        } catch (error) {
          setError('Error fetching health items'); // Updated error message
          console.error('Error fetching health items:', error); // Updated console message
        }
      };
  
      fetchHealthItems(); // Updated function call
    }, []);
  
    const handleClick = (image, description, price, name) => {
      // Carry all necessary data (image, description, and price) without displaying them
      console.log(`Selected item details: ${image}, ${description}, ${price}`);
      // Navigate to the next page with the image, description, and price in state
      navigate(`/popular/health`, { state: { image, description, price, name } }); // Updated navigate path
    };
  
    return (
      <div className="health-items-container"> {/* Updated CSS class name */}
        <h2 className="health-items-heading">Health Items</h2> {/* Updated heading */}
        <div className="health-items-grid"> {/* Updated CSS class name */}
          {healthItems.length > 0 ? ( // Updated state reference
            healthItems.map((item, index) => ( // Updated map function
              <div
                key={index}
                className="health-item-box" // Updated CSS class name
                onClick={() => handleClick(
                  `http://localhost:3000/${item.image}`, 
                  item.description, 
                  item.price,
                  item.name // Added missing name parameter
                )}
              >
                <h4 className="item-name">{item.name}</h4>

                <div className="item-image-container">
                  <img src={`http://localhost:3000/${item.image}`} alt="Health" className="item-image" /> {/* Updated alt text */}
                </div>
                <ul className="view">
                  <p>view</p>
                  <img src={arrow} alt="arrow" />
                </ul>
              </div>
            ))
          ) : (
            <p>No popular health items available</p> // Updated message
          )}
        </div>
      </div>
    );
}

export default HealthItems; // Updated export name
