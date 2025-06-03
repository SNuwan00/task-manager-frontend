import Profile from '../components/Profile';

function ProfilePage() {
  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-6">Profile</h1>
      <Profile />
    </div>
  );
}

export default ProfilePage;