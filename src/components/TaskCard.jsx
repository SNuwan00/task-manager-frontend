import PropTypes from 'prop-types';

// Color map based on your prompt
const statusDot = {
  'NOT_STARTED': 'bg-yellow-400',      // #FFFF00
  'IN_PROGRESS': 'bg-orange-400',      // #FFA500
  'STARTED': 'bg-green-400',           // #32CD32
  'DONE': 'bg-green-900',              // #006400
  'COMPLETED': 'bg-green-900',         // #006400
  'ENDED': 'bg-gray-500',              // #808080
  'UPCOMING': 'bg-blue-300',           // #ADD8E6
};

const timeDot = {
  'UPCOMING': 'bg-blue-300',           // #ADD8E6
  'ENDED': 'bg-gray-500',              // #808080
  'IN_PROGRESS': 'bg-orange-400',      // #FFA500
  'STARTED': 'bg-green-400',           // #32CD32
  'NOT_STARTED': 'bg-yellow-400',      // #FFFF00
  'DONE': 'bg-green-900',              // #006400
  'DUE_TODAY': 'bg-orange-400',        // #FFA500
  'OVERDUE': 'bg-gray-500',            // #808080
  'COMPLETED': 'bg-green-900',         // #006400
};

function DashboardTaskCard({ task }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow flex flex-col gap-2 border-l-4 border-primary hover:shadow-lg transition">
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
  }).isRequired
};

export default DashboardTaskCard;