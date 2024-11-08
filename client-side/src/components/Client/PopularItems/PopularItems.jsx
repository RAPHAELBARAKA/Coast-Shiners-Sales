import React, { useState, useEffect } from 'react';
import api from "../../../api/api.jsx";
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
            const response = await api.get(`/get-item?code=${code}`);
            console.log(`Fetched item for code ${code}:`, response.data[0]); // Log the fetched item
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

  const handleClick = (popular, image, description, price, name) => {
    console.log(`Selected item details: ${popular}, ${image}, ${description}, ${price}`);
    navigate(`/popular/${popular}`, { state: { image, name, description, price } });
  };

  return (
    <div className="popular-items-container">
      <h2 className="popular-items-heading">Popular Items</h2>
      <div className="popular-items-grid">
        {popularItems.length > 0 ? (
          popularItems.map((item, index) => (
            item && item.code ? (
              <div
                key={index}
                className="popular-item-box"
                onClick={() => handleClick(
                  popularMapping[item.code], 
                  `http://localhost:3000/${item.image}`, 
                  item.description, 
                  item.price,
                  item.name
                )}
              >
                <h3 className="item-title">{popularMapping[item.code]}</h3>
                <h4 className="item-name">{item.name}</h4>
                <div className="items-row">
                  <div className="item-container">
                    <img src={`http://localhost:3000/${item.image}`} alt={popularMapping[item.code]} className="item-image" />
                  </div>
                </div>
                <ul className="view">
                  <p>View</p>
                  <img src={arrow} alt="arrow" />
                </ul>
              </div>
            ) : (
              <p key={index}>Item not available or missing code</p>
            )
          ))
        ) : (
          <p>No popular items available</p>
        )}
      </div>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default PopularItems;
