// services/api.js (Updated API instance)

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // Ensure this matches your backend URL
  withCredentials: true, // Allow cookies and credentials
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    // Get the token from localStorage
    const token = localStorage.getItem('authToken');
    
    // If token exists, add Authorization header
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
