import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { authService } from '../services/api';
import PasswordInput from '../components/PasswordInput';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [notification, setNotification] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Check for registration success message
  useEffect(() => {
    if (location.state?.registrationSuccess) {
      setEmail(location.state.email || '');
      setNotification({
        type: 'success',
        message: location.state.message || 'Registration successful! Please sign in.'
      });
      
      // Clear the location state
      window.history.replaceState({}, document.title);
      
      // Hide the notification after a few seconds
      const timer = setTimeout(() => {
        setNotification(null);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const response = await authService.login(email, password);
      console.log('Login successful:', response);
      
      // Navigate to dashboard
      navigate('/', { replace: true });
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || 'Failed to login. Please check your credentials and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setIsLoading(true);
    
    try {
      // For demo purposes - replace with your demo credentials
      await authService.login('demo@example.com', 'demopassword');
      navigate('/', { replace: true });
    } catch (err) {
      console.error('Demo login error:', err);
      setError(err.message || 'Failed to login with demo account.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Task Manager</h1>
          <h2 className="mt-6 text-2xl font-bold text-gray-800 dark:text-gray-200">Sign in to your account</h2>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm dark:bg-red-900 dark:text-red-200">
              <p className="font-medium">Login failed</p>
              <p>{error}</p>
            </div>
          )}
          
          {notification && (
            <div className={`mb-4 p-3 ${
              notification.type === 'success' 
                ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200' 
                : 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
            } rounded-lg text-sm`}>
              <p>{notification.message}</p>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md 
                          focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white dark:border-gray-600"
                placeholder="name@example.com"
              />
            </div>
            
            <div>
              <div className="flex justify-between items-center">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="password">
                  Password
                </label>
                <div className="text-xs">
                  <Link to="#" className="text-primary hover:text-blue-800 dark:hover:text-blue-300">
                    Forgot password?
                  </Link>
                </div>
              </div>
              <PasswordInput
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required={true}
              />
            </div>
            
            <div>
              <button
                type="submit"
                className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white 
                          bg-primary hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition duration-150 ease-in-out
                          ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </span>
                ) : 'Sign in'}
              </button>
            </div>
          </form>
          
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500 dark:bg-gray-800 dark:text-gray-400">Or continue with</span>
              </div>
            </div>
            
            <div className="mt-6">
              <button
                onClick={handleDemoLogin}
                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium 
                          text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600"
                disabled={isLoading}
              >
                Demo Account
              </button>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Don't have an account?{' '}
              <Link to="/signup" className="font-medium text-primary hover:text-blue-700 dark:hover:text-blue-300">
                Sign up now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;




