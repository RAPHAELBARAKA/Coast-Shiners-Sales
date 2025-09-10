import React, { useState, useEffect } from 'react';
import api from "../../../api/api.jsx";

const ItemManagement = () => {
  const [image, setImage] = useState(null);
  const [items, setItems] = useState([]);
  const [itemCode, setItemCode] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [editItemName, setEditItemName] = useState('');
  const [editItemId, setEditItemId] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Handle image selection
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Handle item code change
  const handleItemCodeChange = (e) => {
    setItemCode(e.target.value);
  };

  // Handle name change
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  // Handle description change
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  // Handle price change
  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  // Handle edit name change
  const handleEditNameChange = (e) => {
    setEditItemName(e.target.value);
  };

  // Fetch items when the component mounts
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await api.get('/items'); // Adjust the endpoint as per your API
        setItems(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch items');
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  // Handle item edit
  const handleEdit = (id, name) => {
    setEditItemId(id);
    setEditItemName(name);
  };

  // Submit edited item
  const handleEditSubmit = async () => {
    try {
      await api.put(`/items/${editItemId}`, { name: editItemName }); // Adjust the endpoint as per your API
      alert('Item updated successfully');
      setEditItemId('');
      setEditItemName('');
      // Refresh items list
      const response = await api.get('/items'); // Fetch updated items
      setItems(response.data);
    } catch (error) {
      console.error('Failed to update item:', error);
    }
  };

  // Handle item delete
  const handleDelete = async (id) => {
    try {
      await api.delete(`/items/${id}`); // Adjust the endpoint as per your API
      alert('Item deleted successfully');
      setItems(prevItems => prevItems.filter(item => item._id !== id));
    } catch (error) {
      console.error('Failed to delete item:', error);
    }
  };

  // Handle upload with description and price
  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('image', image);
    formData.append('code', itemCode);
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);

    try {
      await api.post('/add-item', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Item uploaded successfully');
      // Reset form fields
      setImage(null);
      setItemCode('');
      setName('');
      setDescription('');
      setPrice('');
      // Refresh items list
      const response = await api.get('/items'); // Fetch updated items
      setItems(response.data);
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
          1. Food
          2. Household
          3. Clothing
          4. Office Items
          5. Electronics
          6. Healthcare
        </p>
        <input type="text" value={itemCode} onChange={handleItemCodeChange} placeholder="Item Code" />
        <input type="text" value={name} onChange={handleNameChange} placeholder="Item Name" />
        <input type="text" value={description} onChange={handleDescriptionChange} placeholder="Item Description" />
        <input type="number" value={price} onChange={handlePriceChange} placeholder="Item Price" />
        <button onClick={handleUpload}>Upload</button>
      </div>

      <div>
        <h3>Item Gallery</h3>
        {loading ? (
          <p>Loading items...</p>
        ) : error ? (
          <p>{error}</p>
        ) : items.length > 0 ? (
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            {items.map((item, index) => (
              <div key={item._id} style={{ flex: '0 1 calc(33.33% - 10px)', marginBottom: '20px' }}>
                {item && (
                  <>
                    <img src={`http://localhost:3000/${item.image}`} alt={`Item ${index}`} style={{ width: '100%' }} />
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

      {editItemId && (
        <div>
          <h3>Edit Item</h3>
          <input type="text" value={editItemName} onChange={handleEditNameChange} placeholder="New Item Name" />
          <button onClick={handleEditSubmit}>Submit</button>
        </div>
      )}
    </div>
  );
};

export default ItemManagement;
