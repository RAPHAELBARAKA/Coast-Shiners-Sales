import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ItemManagement = () => {
  const [image, setImage] = useState(null);
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [editServiceName, setEditServiceName] = useState('');
  const [editServiceId, setEditServiceId] = useState('');
  const [loading, setLoading] = useState(true); // New state for loading indicator
  const [error, setError] = useState(null); // New state for error handling

  // Handle image selection
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Handle name change
  const handleNameChange = (e) => {
    setItemName(e.target.value);
  };

  // Handle description change
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  // Handle price change
  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  // Handle edit change
  const handleEditNameChange = (e) => {
    setEditServiceName(e.target.value);
  };

  // Handle item edit
  const handleEdit = (id, name) => {
    setEditServiceId(id);
    setEditServiceName(name);
  };

  // Submit edited item
  const handleEditSubmit = async () => {
    try {
      await axios.put(`http://localhost:3000/edit-service/${editServiceId}`, { code: editServiceName });
      alert('Service updated successfully');
      setEditServiceId('');
      setEditServiceName('');
    } catch (error) {
      console.error('Failed to update service:', error);
    }
  };

  // Handle upload with description and price
  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('image', image);
    formData.append('code', itemName);
    formData.append('description', description);
    formData.append('price', price);

    try {
      await axios.post('http://localhost:3000/add-item', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Item uploaded successfully');
      setImage(null); // Reset image state after upload
      setItemName(''); // Reset item name state after upload
      setDescription(''); // Reset description state after upload
      setPrice(''); // Reset price state after upload
    } catch (error) {
      console.error('Failed to upload item:', error);
    }
  };

  // Render the form for adding and editing items
  return (
    <div>
      <h2>Item Management</h2>
      <div>
        <h3>Add Item</h3>
        <input type="file" onChange={handleImageChange} />
        <p>
          1.Food
          2.Household
          3.Clothing
          4.Office Items
          5.Electronics
          6.Healthcare
        </p>
        <input type="text" value={itemName} onChange={handleNameChange} placeholder="Item Code" />
        <input type="text" value={description} onChange={handleDescriptionChange} placeholder="Item Description" />
        <input type="number" value={price} onChange={handlePriceChange} placeholder="Item Price" />
        <button onClick={handleUpload}>Upload</button>
      </div>

      <div>
        <h3>Item Gallery</h3>
        {items.length > 0 ? (
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            {items.map((item, index) => (
              <div key={index} style={{ flex: '0 1 calc(33.33% - 10px)', marginBottom: '20px' }}>
                {item && (
                  <>
                    <img src={`http://localhost:3000/${item.image}`} alt={`Service ${index}`} style={{ width: '100%' }} />
                    <p style={{ textAlign: 'center' }}>{item.name}</p>
                    <button onClick={() => handleEdit(item._id, item.name)}>Edit</button>
                    <button onClick={() => handleDelete(item._id)}>Delete</button>
                  </>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p>No items available.</p>
        )}
      </div>

      {/* Edit Service Form */}
      {editServiceId && (
        <div>
          <h3>Edit Service</h3>
          <input type="text" value={editServiceName} onChange={handleEditNameChange} />
          <button onClick={handleEditSubmit}>Update</button>
        </div>
      )}
    </div>
  );
};

export default ItemManagement;
