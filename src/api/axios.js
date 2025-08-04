// src/api/axios.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api", // ✅ THIS IS CORRECT FOR LOCAL BACKEND
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
