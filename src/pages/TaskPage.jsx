
import { useState } from 'react';
import TaskForm from '../components/TaskForm';

function TaskPage() {
  const [refresh, setRefresh] = useState(false);
  const [tasks, setTasks] = useState([
    { 
      id: 1, 
      title: 'Complete project proposal', 
      description: 'Draft a project proposal document', 
      startDateTime: '2025-06-03T09:00:00',
      endDateTime: '2025-06-05T17:30:00'
    },
    { 
      id: 2, 
      title: 'Review code', 
      description: 'Review pull request #42', 
      startDateTime: '2025-06-04T14:00:00',
      endDateTime: null
    },
  ]);

  const handleTaskAdded = (newTask) => {
    // In a real app, you would fetch tasks from API here
    console.log('Task added, refreshing task list');
    setRefresh(!refresh);
    
    // For demo purposes, add the new task to the list with an ID
    const mockId = Math.floor(Math.random() * 1000);
    setTasks([...tasks, { 
      id: mockId,
      ...newTask
    }]);
  };
  
  // Helper function to format dates for display
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  // Calculate task status based on dates
  const getTaskStatus = (startDateTime, endDateTime) => {
    const now = new Date();
    const startDate = new Date(startDateTime);
    
    if (endDateTime) {
      const endDate = new Date(endDateTime);
      if (now > endDate) return 'Completed';
      if (now >= startDate && now <= endDate) return 'In Progress';
    } else {
      if (now >= startDate) return 'In Progress';
    }
    
    return 'Upcoming';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Task Creation Form */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-6">Create Task</h1>
        <TaskForm onTaskAdded={handleTaskAdded} />
      </div>
      
      {/* Task List */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-6">Your Tasks</h1>
        <div className="space-y-4">
          {tasks.map((task) => {
            const status = getTaskStatus(task.startDateTime, task.endDateTime);
            
            return (
              <div key={task.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{task.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mt-1">{task.description}</p>
                
                <div className="mt-2 flex flex-wrap gap-2">
                  <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Start: {formatDate(task.startDateTime)}
                  </span>
                  
                  {task.endDateTime && (
                    <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      End: {formatDate(task.endDateTime)}
                    </span>
                  )}
                </div>
                
                <div className="mt-3 flex justify-between items-center">
                  <span className={`px-2 py-1 rounded text-xs ${
                    status === 'Completed' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                    status === 'In Progress' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                    'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                  }`}>
                    {status}
                  </span>
                  <div>
                    <button className="text-primary hover:text-blue-700 mr-2">Edit</button>
                    <button className="text-red-600 hover:text-red-800">Delete</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default TaskPage;