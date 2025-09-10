import axios from 'axios';

// Create an Axios instance with a hardcoded base URL
const api = axios.create({
  baseURL: 'http://localhost:3000', // Replace with your actual base URL
});

export default api;
