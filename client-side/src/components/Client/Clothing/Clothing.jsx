import React, { useState, useEffect } from 'react';
import api from "../../../api/api.jsx";
import './Clothing.css'; // Updated CSS file import
import arrow from '../../../assets/arrow.png';
import { useNavigate } from 'react-router-dom';

function ClothingItems() { // Updated component name
    const [clothingItems, setClothingItems] = useState([]); // Updated state name
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Initialize navigate
  
    useEffect(() => {
      const fetchClothingItems = async () => { // Updated function name
        try {
          // Fetch all items with code=2 (clothing items)
          const response = await api.get('/get-all-items', { params: { code: 3 } });
          const items = response.data;
  
          if (Array.isArray(items)) {
            setClothingItems(items); // Updated state setting
          } else {
            console.error('Expected an array but got:', typeof items);
          }
        } catch (error) {
          setError('Error fetching clothing items'); // Updated error message
          console.error('Error fetching clothing items:', error); // Updated console message
        }
      };
  
      fetchClothingItems(); // Updated function call
    }, []);
  
    const handleClick = (image, description, price, name) => {
      // Carry all necessary data (image, description, and price) without displaying them
      console.log(`Selected item details: ${image}, ${description}, ${price}`);
      // Navigate to the next page with the image, description, and price in state
      navigate(`/popular/clothing`, { state: { image, description, price, name } }); // Updated navigate path
    };
  
    return (
      <div className="clothing-items-container"> {/* Updated CSS class name */}
        <h2 className="clothing-items-heading">Clothing Items</h2> {/* Updated heading */}
        <div className="clothing-items-grid"> {/* Updated CSS class name */}
          {clothingItems.length > 0 ? ( // Updated state reference
            clothingItems.map((item, index) => ( // Updated map function
              <div
                key={index}
                className="clothing-item-box" // Updated CSS class name
                onClick={() => handleClick(
                  `http://localhost:3000/${item.image}`, 
                  item.description, 
                  item.price,
                  item.name // Added missing name parameter
                )}
              >
                <h4 className="item-name">{item.name}</h4>

                <div className="item-image-container">
                  <img src={`http://localhost:3000/${item.image}`} alt="Clothing" className="item-image" /> {/* Updated alt text */}
                </div>
                <ul className="view">
                  <p>view</p>
                  <img src={arrow} alt="arrow" />
                </ul>
              </div>
            ))
          ) : (
            <p>No popular clothing items available</p> // Updated message
          )}
        </div>
      </div>
    );
}

export default ClothingItems; // Updated export name
