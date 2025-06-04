import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

// Create axios instance with common configuration
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  // Adding a timeout
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
      
      // Check if the response has data and a token
      if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('isLoggedIn', 'true');
      } else {
        // If login succeeded but no token, still mark as logged in
        localStorage.setItem('isLoggedIn', 'true');
      }
      
      return response.data;
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response.status === 401) {
          throw new Error('Invalid email or password');
        }
        throw new Error(error.response.data?.message || 'Login failed. Please try again.');
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request);
        throw new Error('Unable to connect to server. Please check your internet connection.');
      } else {
        // Something happened in setting up the request
        console.error('Error setting up request:', error.message);
        throw new Error('An error occurred. Please try again.');
      }
    }
  },
  
  register: async (userData) => {
    try {
      const response = await apiClient.post('/users/register', userData);
      
      if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('isLoggedIn', 'true');
      }
      
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
    localStorage.removeItem('token');
    localStorage.removeItem('isLoggedIn');
  },
  
  isAuthenticated: () => {
    return localStorage.getItem('isLoggedIn') === 'true';
  }
};

// Export the API client for other services
export default apiClient;