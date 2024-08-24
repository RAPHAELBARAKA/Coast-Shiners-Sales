import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ItemManagement = () => {
  const [image, setImage] = useState(null);
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState('');
  const [editServiceName, setEditServiceName] = useState('');
  const [editServiceId, setEditServiceId] = useState('');
  const [loading, setLoading] = useState(true); // New state for loading indicator
  const [error, setError] = useState(null); // New state for error handling

  {/* useEffect(() => {
    fetchServices();
  }, []);

 const fetchServices = async () => {
    try {
      const response = await axios.get('http://localhost:3000/fetch-services');
      setServices(response.data.services || []); // Set services or an empty array if undefined
      setLoading(false); // Set loading to false when data is fetched successfully
    } catch (error) {
      setError(error); // Set error state if request fails
      setLoading(false); // Set loading to false in case of error
    }
  };*/}

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleNameChange = (e) => {
    setItemName(e.target.value);
  };

  const handleEditNameChange = (e) => {
    setEditServiceName(e.target.value);
  };

  const handleEdit = (id, name) => {
    setEditServiceId(id);
    setEditServiceName(name);
  };

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

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('image', image);
    formData.append('code', itemName);

    try {
      await axios.post('http://localhost:3000/add-item', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Service uploaded successfully');
      setImage(null); // Reset image state after upload
      setItemName(''); // Reset service name state after upload
    } catch (error) {
      console.error('Failed to upload service:', error);
    }
  };

 {/* const handleDelete = async (serviceId) => {
    try {
      await axios.delete(`http://localhost:3000/delete-service/${serviceId}`);
      alert('Service deleted successfully');
      fetchServices(); // Refresh the service gallery after deletion
    } catch (error) {
      console.error('Failed to delete service:', error);
    }
  };

  // Display loading indicator if data is being fetched
  if (loading) {
    return <p>Loading services...</p>;
  }

  // Display error message if request fails
  if (error) {
    return <p>Error: {error.message}</p>;
  }*/}

  return (
    <div>
      <h2>Item Management</h2>
      <div>
        <h3>Add Item</h3>
        <input type="file" onChange={handleImageChange} />
        <p>1.Food
           2.Household
           3.Clothing
           4.Office Items
           5.Electronics
           6.Healthcare</p>
        <input type="text" value={itemName} onChange={handleNameChange} placeholder="Item Code" />
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
          <p>No Item available.</p>
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
