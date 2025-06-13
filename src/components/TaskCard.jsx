import PropTypes from 'prop-types';

const statusDot = {
  'NOT_STARTED': 'bg-yellow-400',
  'IN_PROGRESS': 'bg-orange-400',
  'STARTED': 'bg-green-400',
  'DONE': 'bg-green-900',
  'COMPLETED': 'bg-green-900',
  'ENDED': 'bg-gray-500',
  'UPCOMING': 'bg-blue-300',
};

const timeDot = {
  'UPCOMING': 'bg-blue-300',
  'ENDED': 'bg-gray-500',
  'IN_PROGRESS': 'bg-orange-400',
  'STARTED': 'bg-green-400',
  'NOT_STARTED': 'bg-yellow-400',
  'DONE': 'bg-green-900',
  'DUE_TODAY': 'bg-orange-400',
  'OVERDUE': 'bg-gray-500',
  'COMPLETED': 'bg-green-900',
};

function DashboardTaskCard({ task, onClick }) {
  // Check if task has id, taskId, or _id property
  const getTaskId = () => {
    // Try to get the ID from various possible properties
    return task.id || task.taskId || task._id;
  };
  
  const handleClick = () => {
    if (onClick) {
      onClick(task);
    }
  };

  return (
    <div 
      className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow flex flex-col gap-2 border-l-4 border-primary hover:shadow-lg transition cursor-pointer"
      onClick={handleClick}
    >
      <div className="flex items-center gap-2">
        <span className={`w-2.5 h-2.5 rounded-full ${statusDot[task.userStatus] || 'bg-gray-300'}`}></span>
        <span className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">{task.title}</span>
      </div>
      <div className="flex items-center gap-4 mt-1">
        <div className="flex items-center gap-1">
          <span className={`w-2 h-2 rounded-full ${statusDot[task.userStatus] || 'bg-gray-300'}`}></span>
          <span className="text-xs text-gray-600 dark:text-gray-400">{task.userStatus?.replace('_', ' ')}</span>
        </div>
        <div className="flex items-center gap-1">
          <span className={`w-2 h-2 rounded-full ${timeDot[task.timeStatus] || 'bg-gray-300'}`}></span>
          <span className="text-xs text-gray-600 dark:text-gray-400">{task.timeStatus?.replace('_', ' ')}</span>
        </div>
      </div>
    </div>
  );
}

DashboardTaskCard.propTypes = {
  task: PropTypes.shape({
    title: PropTypes.string.isRequired,
    userStatus: PropTypes.string.isRequired,
    timeStatus: PropTypes.string.isRequired
    // Not requiring id fields since we handle missing IDs
  }).isRequired,
  onClick: PropTypes.func
};

export default DashboardTaskCard;