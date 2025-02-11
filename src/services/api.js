// Add authentication token to API calls (api.js)
import axios from "axios";
const api = axios.create({
  baseURL: "http://localhost:3000", // Ensure backend is running on this port
  headers: {
    "Content-Type": "application/json",
  },
});
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});
export default api;