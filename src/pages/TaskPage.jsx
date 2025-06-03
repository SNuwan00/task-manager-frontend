import { useState } from 'react';
import TaskForm from '../components/TaskForm';

function TaskPage() {
  const [refresh, setRefresh] = useState(false);
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Complete project proposal', description: 'Draft a project proposal document', status: 'In Progress' },
    { id: 2, title: 'Review code', description: 'Review pull request #42', status: 'To-Do' },
  ]);

  const handleTaskAdded = () => {
    // In a real app, you would fetch tasks from API here
    console.log('Task added, refreshing task list');
    setRefresh(!refresh);
    // For demo purposes, add a mock task to the list
    const mockId = Math.floor(Math.random() * 1000);
    setTasks([...tasks, { 
      id: mockId, 
      title: 'New Task ' + mockId, 
      description: 'This is a mock task', 
      status: 'To-Do' 
    }]);
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
          {tasks.map((task) => (
            <div key={task.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{task.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 mt-1">{task.description}</p>
              <div className="mt-2 flex justify-between items-center">
                <span className={`px-2 py-1 rounded text-xs ${
                  task.status === 'Done' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                  task.status === 'In Progress' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                  'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                }`}>
                  {task.status}
                </span>
                <div>
                  <button className="text-primary hover:text-blue-700 mr-2">Edit</button>
                  <button className="text-red-600 hover:text-red-800">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TaskPage;