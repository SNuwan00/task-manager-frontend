import { useState } from 'react';

function TaskForm({ onTaskAdded }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('To-Do');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Mock API call for now - replace with actual API call when ready
      const task = { title, description, status };
      console.log('Creating task:', task);
      // await createTask(task); - Uncomment when API service is ready
      
      onTaskAdded();
      setTitle('');
      setDescription('');
      setStatus('To-Do');
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">Add New Task</h2>
      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300 mb-1" htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300 mb-1" htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
          rows="4"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300 mb-1" htmlFor="status">Status</label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full p-2 border rounded dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
        >
          <option>To-Do</option>
          <option>In Progress</option>
          <option>Done</option>
        </select>
      </div>
      <button
        type="submit"
        className="w-full bg-primary text-white p-2 rounded hover:bg-blue-700 transition"
      >
        Add Task
      </button>
    </form>
  );
}

export default TaskForm;