import { authService } from '../services/api';
import { useState, useEffect } from 'react';

function Profile() {

  const [email, setEmail] = useState('john@example.com');
  const [name, setName] = useState('JohnDoe');


  useEffect(() => {
    setEmail(authService.getUserEmail());
    setName(authService.getUserName());
    myFunction();
  }, []);

  const myFunction = () => {
    console.log('Function called automatically!');
    // ...your logic here (API call, etc.)
  };

  
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">User Profile</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-2">Username: {name}</p>
      <p className="text-gray-600 dark:text-gray-400 mb-4">Email: {email}</p>
      <button className="bg-primary text-white p-2 rounded hover:bg-blue-700 transition">
        Edit Profile
      </button>
    </div>
  );
}

export default Profile;