import axios from 'axios';

const API_URL = "http://localhost:3000/api/v1";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to request headers if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/signin';
    }
    return Promise.reject(error);
  }
);

// AUTH APIs
export const signup = (userData) => api.post('/auth/sign-up', userData);
export const signin = (userData) => api.post('/auth/sign-in', userData);

// User APIs
export const getAllUsers = () => api.get('/users');
export const getUserById = (id) => api.get(`/users/${id}`); // Fixed: was .put, should be .get
export const getMe = () => api.get('/users/me'); // Get current user profile

export default api;