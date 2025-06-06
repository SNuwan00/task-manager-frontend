import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

// Create axios instance with common configuration
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000
});

// Add interceptor for authentication
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth services
export const authService = {
  login: async (email, password) => {
    try {
      const response = await apiClient.post('/users/login', { email, password });
      
      // Store token if available
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      
      // Store user ID
      if (response.data.userId) {
        localStorage.setItem('userId', response.data.userId);
      }
      
      // Mark as logged in
      localStorage.setItem('isLoggedIn', 'true');
      
      // Notify components about auth change
      window.dispatchEvent(new Event('authChange'));
      
      return response.data;
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          throw new Error('Invalid email or password');
        }
        throw new Error(error.response.data?.message || 'Login failed. Please try again.');
      } else if (error.request) {
        throw new Error('Unable to connect to server. Please check your internet connection.');
      } else {
        throw new Error('An error occurred. Please try again.');
      }
    }
  },
  
  register: async (userData) => {
    try {
      const response = await apiClient.post('/users/signup', userData);
      // Don't log in the user immediately, just return the response
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data?.message || 'Registration failed. Please try again.');
      } else if (error.request) {
        throw new Error('Unable to connect to server. Please check your internet connection.');
      } else {
        throw new Error('An error occurred. Please try again.');
      }
    }
  },
  
  logout: () => {
    // Clear all auth-related data
    localStorage.removeItem('token');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userId');
    
    // Notify components
    window.dispatchEvent(new Event('authChange'));
  },
  
  isAuthenticated: () => {
    return localStorage.getItem('isLoggedIn') === 'true';
  },
  
  getUserId: () => {
    return localStorage.getItem('userId');
  }
};

export default apiClient;