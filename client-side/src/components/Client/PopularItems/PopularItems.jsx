import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PopularItems.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom';
import arrow from '../../../assets/arrow.png';

function PopularItems() {
  const [popularItems, setPopularItems] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize navigate

  const popularMapping = {
    1: 'Food',
    2: 'Household',
    3: 'Clothing',
    4: 'Office Items',
    5: 'Electronics',
    6: 'Healthcare',
  };

  useEffect(() => {
    const fetchPopularItems = async () => {
      try {
        const fetchItems = async (code) => {
          try {
            const response = await axios.get(`https://coast-shiners-sales-3.onrender.com/get-item?code=${code}`);
            return response.data[0]; // Get the most recent item
          } catch (error) {
            console.error(`Error fetching items for code ${code}:`, error);
            return null;
          }
        };

        const fetchAllItems = async () => {
          const promises = Object.keys(popularMapping).map(code => fetchItems(code));
          const results = await Promise.all(promises);
          const allItems = results.filter(item => item !== null);
          setPopularItems(allItems);
        };

        fetchAllItems();
      } catch (error) {
        setError('Error fetching popular items');
        console.error('Error fetching popular items:', error);
      }
    };

    fetchPopularItems();
  }, []);

  const handleClick = (popular, image, description, price) => {
    // Carry all necessary data (image, description, and price) without displaying them
    console.log(`Selected item details: ${popular}, ${image}, ${description}, ${price}`);
    // Navigate to the next page with the image, description, and price in state
    navigate(`/popular/${popular}`, { state: { image, description, price } });
  };

  return (
    <div className="popular-items-container">
      <h2 className="popular-items-heading">Popular Items</h2>
      <div className="popular-items-grid">
        {popularItems.length > 0 ? (
          popularItems.map((item, index) => (
            <div
              key={index}
              className="popular-item-box"
              onClick={() => handleClick(
                popularMapping[item.code], 
                `https://coast-shiners-sales-3.onrender.com/${item.image}`, 
                item.description, 
                item.price
              )}
            >
              <h3 className="item-title">{popularMapping[item.code]}</h3>
              <div className="items-row">
                <div className="item-container">
                  <img src={`https://coast-shiners-sales-3.onrender.com/${item.image}`} alt={popularMapping[item.code]} className="item-image" />
                </div>
              </div>
              <ul className="view">
                <p>view</p>
                <img src={arrow} alt="arrow" />
              </ul>
            </div>
          ))
        ) : (
          <p>No popular items available</p>
        )}
      </div>
    </div>
  );
}

export default PopularItems;
