
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

function ProfilePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [notification, setNotification] = useState(null);
  const user = { 
    username: 'JohnDoe',
    email: 'john@example.com',
    fullName: 'John Doe',
    bio: 'Task management enthusiast and software developer.',
    avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=0D8ABC&color=fff'
  };

  useEffect(() => {
    // Check for success message from ProfileEditPage
    if (location.state?.success) {
      setNotification({
        type: 'success',
        message: location.state.message
      });
      
      // Clear notification after 3 seconds
      const timer = setTimeout(() => {
        setNotification(null);
        // Clear location state
        window.history.replaceState({}, document.title);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [location]);

  const handleEditProfile = () => {
    navigate('/profile/edit');
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      {notification && (
        <div className={`p-4 ${notification.type === 'success' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'}`}>
          {notification.message}
        </div>
      )}
      
      <div className="p-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <img 
            src={user.avatar} 
            alt="Profile" 
            className="w-24 h-24 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700"
          />
          
          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">{user.fullName}</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-1">@{user.username}</p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{user.email}</p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">{user.bio}</p>
            
            <button
              onClick={handleEditProfile}
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>
      
      <div className="border-t border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Account Statistics</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg text-center">
            <div className="text-2xl font-bold text-primary">12</div>
            <div className="text-gray-600 dark:text-gray-400 text-sm">Completed Tasks</div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg text-center">
            <div className="text-2xl font-bold text-yellow-500">5</div>
            <div className="text-gray-600 dark:text-gray-400 text-sm">Pending Tasks</div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg text-center">
            <div className="text-2xl font-bold text-green-500">85%</div>
            <div className="text-gray-600 dark:text-gray-400 text-sm">Completion Rate</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;