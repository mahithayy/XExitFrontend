// src/api/axios.js
import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

// Attach token to every request if available
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;

