import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import PasswordInput from '../components/PasswordInput';
//import { authService } from '../services/api';

function SignupPage() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccessMessage('');
    
    // Validate password match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      setIsLoading(false);
      return;
    }
    
    try {
      // Prepare data for API - exactly as specified
      const apiData = {
        username: formData.username,
        email: formData.email,
        password: formData.password
      };
      
      // Send request to the correct endpoint
      const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';
      const response = await axios.post(`${API_URL}/users/signup`, apiData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      console.log('Signup successful:', response.data);
      
      // Set success message
      setSuccessMessage('Account created successfully! Redirecting to login...');
      
      // Navigate to login page after a short delay (to show success message)
      setTimeout(() => {
        navigate('/login', { 
          replace: true,
          state: { 
            registrationSuccess: true, 
            email: formData.email,
            message: 'Your account has been created successfully! Please sign in.'
          }
        });
      }, 1500);
      
    } catch (err) {
      console.error('Signup error:', err);
      
      if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        setError(err.response.data?.message || `Registration failed: ${err.response.status}`);
      } else if (err.request) {
        // The request was made but no response was received
        setError('Unable to connect to server. Please check your internet connection.');
      } else {
        // Something happened in setting up the request
        setError('An error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Task Manager</h1>
          <h2 className="mt-6 text-2xl font-bold text-gray-800 dark:text-gray-200">Create your account</h2>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm dark:bg-red-900 dark:text-red-200">
              <p className="font-medium">Registration failed</p>
              <p>{error}</p>
            </div>
          )}
          
          {successMessage && (
            <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg text-sm dark:bg-green-900 dark:text-green-200">
              <p className="font-medium">Success!</p>
              <p>{successMessage}</p>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="username">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                value={formData.username}
                onChange={handleChange}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md 
                          focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white dark:border-gray-600"
                placeholder="johndoe"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="email">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md 
                          focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white dark:border-gray-600"
                placeholder="name@example.com"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="password">
                Password
              </label>
              <PasswordInput
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required={true}
                autoComplete="new-password"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <PasswordInput
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required={true}
                autoComplete="new-password"
              />
            </div>
            
            <div>
              <button
                type="submit"
                className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white 
                          bg-primary hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition duration-150 ease-in-out
                          ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                disabled={isLoading || successMessage}
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating account...
                  </span>
                ) : 'Create account'}
              </button>
            </div>
          </form>
          
          <div className="text-center mt-8">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-primary hover:text-blue-700 dark:hover:text-blue-300">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;