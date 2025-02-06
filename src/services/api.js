import axios from "axios";

const api=axios.create({
    baseURL:"https://finance-manager-bd.onrender.com",
    headers:{'Content-Type': 'application/json',}
})

api.interceptors.request.use((config)=>{const token = localStorage.getItem('authToken');  // Get token from local storage
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;  // Add token to headers
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);})

export default api