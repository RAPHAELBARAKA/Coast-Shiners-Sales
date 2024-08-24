import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PopularItems.css'; // Import the CSS file

function PopularItems() {
  const [popularItems, setPopularItems] = useState([]);
  const [error, setError] = useState(null);

  // Mapping numbers to category names
  const categoryMapping = {
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
        // Fetch items for each category code
        const fetchItems = async (code) => {
          try {
            const response = await axios.get(`http://localhost:3000/get-item?code=${code}`);
            return response.data;
          } catch (error) {
            console.error(`Error fetching items for code ${code}:`, error);
            return [];
          }
        };

        // Fetch items for all categories
        const fetchAllItems = async () => {
          const promises = Object.keys(categoryMapping).map(code => fetchItems(code));
          const results = await Promise.all(promises);
          
          // Combine all items into a single array
          const allItems = results.flat();
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

  return (
    <div className="popular-items-container">
      <h2 className="popular-items-heading">Popular Items</h2>
      <div className="popular-items-grid">
        {Object.keys(categoryMapping).map((code) => {
          // Filter items by category code
          const categoryItems = popularItems.filter(item => item.code === code);

          return (
            <div key={code} className="popular-item-box">
              <h3 className="item-title">{categoryMapping[code]}</h3>
              <div className="items-row">
                {categoryItems.length > 0 ? (
                  <div className="item-container">
                    <img src={`http://localhost:3000/${categoryItems[0].image}`} alt={categoryMapping[code]} className="item-image" />
                  </div>
                ) : (
                  <p>No items available</p>
                )}
              </div>
              <h4 className="view">view</h4>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PopularItems;
