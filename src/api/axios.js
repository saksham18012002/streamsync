// src/api/axios.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

// Attach token to all requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken'); // consistent key
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
