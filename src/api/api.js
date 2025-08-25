import axios from "axios";

// Create axios instance
const api = axios.create({
  baseURL: "http://localhost:3100/api/auth", // your backend base URL
});

// Attach token automatically if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // token saved after login
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
