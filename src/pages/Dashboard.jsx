import { useState, useEffect } from 'react';
import DashboardTaskCard from '../components/TaskCard';
import apiClient from '../services/api';
import { authService } from '../services/api';

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingCompleted, setIsLoadingCompleted] = useState(true);
  const [taskStats, setTaskStats] = useState({
    pending: 0,
    completed: 0,
    dueToday: 0
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      setIsLoadingCompleted(true);
      const userId = authService.getUserId();
      try {
        // Fetch recent tasks
        const response = await apiClient.get(`/tasks/user/${userId}/all`, {
          params: { page: 0, size: 9 }
        });
        const taskData = Array.isArray(response.data)
          ? response.data
          : response.data.content || [];
        setTasks(taskData);

        // Calculate stats
        const stats = {
          pending: taskData.filter(task => task.userStatus !== 'COMPLETED').length,
          completed: taskData.filter(task => task.userStatus === 'COMPLETED').length,
          dueToday: taskData.filter(task => task.timeStatus === 'DUE_TODAY').length
        };
        setTaskStats(stats);

        // Fetch completed tasks
        const completedRes = await apiClient.get(`/tasks/user/${userId}/all-done`, {
          params: { page: 0, size: 9 }
        });
        const completedData = Array.isArray(completedRes.data)
          ? completedRes.data
          : completedRes.data.content || [];
        setCompletedTasks(completedData);
      } catch (err) {
        console.error('Failed to fetch dashboard data:', err);
        setTasks([]);
        setCompletedTasks([]);
        setTaskStats({ pending: 0, completed: 0, dueToday: 0 });
      } finally {
        setIsLoading(false);
        setIsLoadingCompleted(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">Dashboard</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        Welcome to your task management dashboard. Here you can see an overview of your tasks and activities.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        <div className="bg-blue-50 dark:bg-gray-700 p-4 rounded-lg">
          <h3 className="font-semibold text-gray-800 dark:text-gray-200">Tasks Overview</h3>
          <p className="text-gray-600 dark:text-gray-400">
            You have {taskStats.pending} pending tasks
          </p>
        </div>
        <div className="bg-green-50 dark:bg-gray-700 p-4 rounded-lg">
          <h3 className="font-semibold text-gray-800 dark:text-gray-200">Recent Activity</h3>
          <p className="text-gray-600 dark:text-gray-400">
            {taskStats.completed} tasks completed
          </p>
        </div>
        <div className="bg-yellow-50 dark:bg-gray-700 p-4 rounded-lg">
          <h3 className="font-semibold text-gray-800 dark:text-gray-200">Upcoming Deadlines</h3>
          <p className="text-gray-600 dark:text-gray-400">
            {taskStats.dueToday} tasks due today
          </p>
        </div>
      </div>
      
      {/* Recent Tasks Section */}
      <div className="mt-8">
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">Recent Tasks</h3>
        {isLoading ? (
          <div className="text-center py-4">
            <p className="text-gray-500 dark:text-gray-400">Loading tasks...</p>
          </div>
        ) : tasks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tasks.map((task, idx) => (
              <DashboardTaskCard 
                key={task.id || idx} 
                task={task} 
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-gray-500 dark:text-gray-400">No tasks found. Create a new task to get started.</p>
          </div>
        )}
      </div>

      {/* Completed Tasks Section */}
      <div className="mt-8">
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">Completed Tasks</h3>
        {isLoadingCompleted ? (
          <div className="text-center py-4">
            <p className="text-gray-500 dark:text-gray-400">Loading completed tasks...</p>
          </div>
        ) : completedTasks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {completedTasks.map((task, idx) => (
              <DashboardTaskCard 
                key={task.id || `done-${idx}`} 
                task={task} 
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-gray-500 dark:text-gray-400">No completed tasks found.</p>
          </div>
        )}
      </div>
      
      {/* Quick Actions */}
      <div className="mt-8">
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">Quick Actions</h3>
        <div className="flex flex-wrap gap-3">
          <a href="/tasks" className="bg-primary hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors">
            Create New Task
          </a>
          <a href="/tasks" className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium py-2 px-4 rounded-md transition-colors">
            View All Tasks
          </a>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;