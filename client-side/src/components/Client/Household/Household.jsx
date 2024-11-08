import React, { useState, useEffect } from 'react';
import api from "../../../api/api.jsx";
import './Household.css'; // Updated CSS file import
import arrow from '../../../assets/arrow.png';
import { useNavigate } from 'react-router-dom';

function HouseholdItems() { // Updated component name
    const [householdItems, setHouseholdItems] = useState([]); // Updated state name
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Initialize navigate
  
    useEffect(() => {
      const fetchHouseholdItems = async () => { // Updated function name
        try {
          // Fetch all items with code=1 (household items)
          const response = await api.get('/get-all-items', { params: { code: 2 } });
          const items = response.data;
  
          if (Array.isArray(items)) {
            setHouseholdItems(items); // Updated state setting
          } else {
            console.error('Expected an array but got:', typeof items);
          }
        } catch (error) {
          setError('Error fetching household items'); // Updated error message
          console.error('Error fetching household items:', error); // Updated console message
        }
      };
  
      fetchHouseholdItems(); // Updated function call
    }, []);
  
    const handleClick = (image, description, price, name) => {
      // Carry all necessary data (image, description, and price) without displaying them
      console.log(`Selected item details: ${image}, ${description}, ${price}`);
      // Navigate to the next page with the image, description, and price in state
      navigate(`/popular/household`, { state: { image, description, price, name } }); // Updated navigate path
    };
  
    return (
      <div className="household-items-container"> {/* Updated CSS class name */}
        <h2 className="household-items-heading">Household Items</h2> {/* Updated heading */}
        <div className="household-items-grid"> {/* Updated CSS class name */}
          {householdItems.length > 0 ? ( // Updated state reference
            householdItems.map((item, index) => ( // Updated map function
              <div
                key={index}
                className="household-item-box" // Updated CSS class name
                onClick={() => handleClick(
                  `http://localhost:3000/${item.image}`, 
                  item.description, 
                  item.price,
                  item.name // Added missing name parameter
                )}
              >
                <h4 className="item-name">{item.name}</h4>

                <div className="item-image-container">
                  <img src={`http://localhost:3000/${item.image}`} alt="Household" className="item-image" /> {/* Updated alt text */}
                </div>
                <ul className="view">
                  <p>view</p>
                  <img src={arrow} alt="arrow" />
                </ul>
              </div>
            ))
          ) : (
            <p>No popular household items available</p> // Updated message
          )}
        </div>
      </div>
    );
}

export default HouseholdItems; // Updated export name
