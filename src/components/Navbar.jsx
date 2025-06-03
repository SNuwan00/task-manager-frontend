import { Link } from 'react-router-dom';
import { useState } from 'react';

function Navbar() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-primary">
          Task Manager
        </Link>
        <div className="space-x-4 flex items-center">
          <Link to="/" className="text-gray-600 dark:text-gray-200 hover:text-primary">
            Dashboard
          </Link>
          <Link to="/tasks" className="text-gray-600 dark:text-gray-200 hover:text-primary">
            Tasks
          </Link>
          <Link to="/profile" className="text-gray-600 dark:text-gray-200 hover:text-primary">
            Profile
          </Link>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            aria-label="Toggle dark mode"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;