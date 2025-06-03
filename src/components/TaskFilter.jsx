function TaskFilter({ onFilterChange }) {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="filter">Filter by Status</label>
      <select
        id="filter"
        onChange={(e) => onFilterChange(e.target.value)}
        className="p-2 border rounded dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
      >
        <option value="All">All</option>
        <option value="To-Do">To-Do</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
      </select>
    </div>
  );
}

export default TaskFilter;