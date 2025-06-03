function Profile() {
  const user = { username: 'JohnDoe', email: 'john@example.com' };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">User Profile</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-2">Username: {user.username}</p>
      <p className="text-gray-600 dark:text-gray-400 mb-4">Email: {user.email}</p>
      <button className="bg-primary text-white p-2 rounded hover:bg-blue-700 transition">
        Edit Profile
      </button>
    </div>
  );
}

export default Profile;