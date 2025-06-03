function TaskCard({ task }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{task.title}</h3>
      <p className="text-gray-600 dark:text-gray-400">{task.description}</p>
      <span
        className={`inline-block mt-2 px-3 py-1 rounded-full text-sm ${
          task.status === 'To-Do' ? 'bg-red-100 text-red-700' :
          task.status === 'In Progress' ? 'bg-yellow-100 text-yellow-700' :
          'bg-green-100 text-green-700'
        }`}
      >
        {task.status}
      </span>
    </div>
  );
}

export default TaskCard;