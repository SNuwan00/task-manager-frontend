function Dashboard() {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">Dashboard</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        Welcome to your task management dashboard. Here you can see an overview of your tasks and activities.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        <div className="bg-blue-50 dark:bg-gray-700 p-4 rounded-lg">
          <h3 className="font-semibold text-gray-800 dark:text-gray-200">Tasks Overview</h3>
          <p className="text-gray-600 dark:text-gray-400">You have 5 pending tasks</p>
        </div>
        
        <div className="bg-green-50 dark:bg-gray-700 p-4 rounded-lg">
          <h3 className="font-semibold text-gray-800 dark:text-gray-200">Recent Activity</h3>
          <p className="text-gray-600 dark:text-gray-400">Last task completed 2 hours ago</p>
        </div>
        
        <div className="bg-yellow-50 dark:bg-gray-700 p-4 rounded-lg">
          <h3 className="font-semibold text-gray-800 dark:text-gray-200">Upcoming Deadlines</h3>
          <p className="text-gray-600 dark:text-gray-400">1 task due tomorrow</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;