function TaskCard({ task }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{task.title}</h3>
      <p className="text-gray-600 dark:text-gray-400">{task.description || 'No description'}</p>
      <div className="mt-2 flex justify-between items-center">
        <span
          className={`inline-block px-3 py-1 rounded-full text-sm ${
            task.status === 'To-Do' ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200' :
            task.status === 'In Progress' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-200' :
            'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200'
          }`}
        >
          {task.status}
        </span>
        <div>
          <button className="text-primary hover:text-blue-700 mr-2">Edit</button>
          <button className="text-red-600 hover:text-red-800">Delete</button>
        </div>
      </div>
    </div>
  );
}

export default TaskCard;