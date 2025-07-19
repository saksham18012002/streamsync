// src/api/axios.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api", // Your backend base URL
  withCredentials: true, // Important for cookies/session
});

export default api;
