// services/api.js (Create or modify this file for the API instance)

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // replace with your backend URL
  withCredentials: true, // Make sure cookies are included in the request
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
