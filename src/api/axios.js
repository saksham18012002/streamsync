// src/api/axios.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true, // ✅ ensures cookies are sent with every request
});

// No need to manually attach token
export default api;
