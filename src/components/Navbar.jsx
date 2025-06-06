import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { authService } from '../services/api';

function Navbar() {
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Function to determine if a nav link is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  useEffect(() => {
    // Check if dark mode was previously enabled
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', newMode.toString());
    document.documentElement.classList.toggle('dark');
  };

  const handleLogout = () => {
    authService.logout();
    navigate('/login', { replace: true });
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-primary">
          Task Manager
        </Link>
        <div className="space-x-4 flex items-center">
          <Link 
            to="/" 
            className={`${isActive('/') 
              ? 'text-primary font-medium' 
              : 'text-gray-600 dark:text-gray-200'} hover:text-primary`}
          >
            Dashboard
          </Link>
          <Link 
            to="/tasks" 
            className={`${isActive('/tasks') 
              ? 'text-primary font-medium' 
              : 'text-gray-600 dark:text-gray-200'} hover:text-primary`}
          >
            Tasks
          </Link>
          <Link 
            to="/profile" 
            className={`${isActive('/profile') || isActive('/profile/edit') 
              ? 'text-primary font-medium' 
              : 'text-gray-600 dark:text-gray-200'} hover:text-primary`}
          >
            Profile
          </Link>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            aria-label="Toggle dark mode"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-200"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;