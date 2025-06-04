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

// Custom event for auth state changes
const authChangeEvent = new Event('authChange');

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
      
      // Dispatch auth change event
      window.dispatchEvent(authChangeEvent);
      
      return response.data;
    } catch (error) {
      // Error handling code remains the same
      if (error.response) {
        if (error.response.status === 401) {
          throw new Error('Invalid email or password');
        }
        throw new Error(error.response.data?.message || 'Login failed. Please try again.');
      } else if (error.request) {
        console.error('No response received:', error.request);
        throw new Error('Unable to connect to server. Please check your internet connection.');
      } else {
        console.error('Error setting up request:', error.message);
        throw new Error('An error occurred. Please try again.');
      }
    }
  },
  
  register: async (userData) => {
    try {
      const response = await apiClient.post('/users/signup', userData);
      
      if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('isLoggedIn', 'true');
        window.dispatchEvent(new Event('authChange'));
      } else {
        // If registration succeeded but no token, still mark as logged in
        localStorage.setItem('isLoggedIn', 'true');
        window.dispatchEvent(new Event('authChange'));
      }
      
      return response.data;
    } catch (error) {
      console.error('Registration error details:', error);
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
    window.dispatchEvent(authChangeEvent);
  },
  
  isAuthenticated: () => {
    return localStorage.getItem('isLoggedIn') === 'true';
  }
};

export default apiClient;