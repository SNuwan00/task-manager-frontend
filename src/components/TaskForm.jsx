import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function TaskForm({ onTaskAdded, onTaskUpdated, initialTask, isEditMode }) {
  // Get today's date in yyyy-MM-dd format for default value
  const today = new Date().toISOString().split('T')[0];
  
  const [formData, setFormData] = useState({
    taskId: null,
    title: '',
    description: '',
    startDate: today,
    startTime: '00:01', // Default start time
    endDate: '',
    endTime: '23:59' // Default end time
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  // Update form data when initialTask changes (for editing)
  useEffect(() => {
    if (initialTask && isEditMode) {
      console.log("Setting form data from initial task:", initialTask);
      setFormData({
        taskId: initialTask.taskId,
        title: initialTask.title || '',
        description: initialTask.description || '',
        startDate: initialTask.startDate || today,
        startTime: initialTask.startTime || '00:01',
        endDate: initialTask.endDate || '',
        endTime: initialTask.endTime || '23:59',
        userStatus: initialTask.userStatus || 'NOT_STARTED',
        timeStatus: initialTask.timeStatus || 'UPCOMING'
      });
    }
  }, [initialTask, isEditMode, today]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    try {
      // Only include fields that have been set
      const formattedTask = {
        taskId: formData.taskId,
        title: formData.title.trim() ? formData.title : null,
        description: formData.description,
        startDate: formData.startDate,
        startTime: formData.startTime || '00:01',
        endDate: formData.endDate || null,
        endTime: formData.endDate ? formData.endTime || '23:59' : null,
        userStatus: formData.userStatus,
        timeStatus: formData.timeStatus
      };
      
      // Log what we're submitting
      console.log(`Submitting ${isEditMode ? 'updated' : 'new'} task:`, formattedTask);
      
      if (isEditMode && onTaskUpdated) {
        // Update existing task
        await onTaskUpdated(formattedTask);
      } else {
        // Create new task
        await onTaskAdded(formattedTask);
        
        // Reset form on success for create mode
        setFormData({
          taskId: null,
          title: '',
          description: '',
          startDate: today,
          startTime: '00:01',
          endDate: '',
          endTime: '23:59',
          userStatus: 'NOT_STARTED',
          timeStatus: 'UPCOMING'
        });
      }
    } catch (error) {
      console.error(`Error ${isEditMode ? 'updating' : 'adding'} task:`, error);
      setError(`Failed to ${isEditMode ? 'update' : 'create'} task. Please try again.`);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm dark:bg-red-900 dark:text-red-200">
          {error}
        </div>
      )}
      
      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Task Title*
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          placeholder="Enter task title"
        />
      </div>
      
      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="3"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          placeholder="Enter task description"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Start Date*
          </label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
        
        <div>
          <label htmlFor="startTime" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Start Time
          </label>
          <input
            type="time"
            id="startTime"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            End Date <span className="text-xs text-gray-500">(optional)</span>
          </label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            min={formData.startDate}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
        
        <div>
          <label htmlFor="endTime" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            End Time
          </label>
          <input
            type="time"
            id="endTime"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
            disabled={!formData.endDate}
            className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white ${!formData.endDate ? 'opacity-50 cursor-not-allowed' : ''}`}
          />
        </div>
      </div>
      
      {isEditMode && (
        <div className="mb-6">
          <label htmlFor="userStatus" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Status
          </label>
          <select
            id="userStatus"
            name="userStatus"
            value={formData.userStatus}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="NOT_STARTED">Not Started</option>
            <option value="STARTED">Started</option>
            <option value="DONE">Done</option>
          </select>
        </div>
      )}
      
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`px-4 py-2 bg-primary text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors ${
            isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {isEditMode ? 'Updating Task...' : 'Creating Task...'}
            </span>
          ) : (
            isEditMode ? 'Save Changes' : 'Create Task'
          )}
        </button>
      </div>
    </form>
  );
}

TaskForm.propTypes = {
  onTaskAdded: PropTypes.func,
  onTaskUpdated: PropTypes.func,
  initialTask: PropTypes.object,
  isEditMode: PropTypes.bool
};

TaskForm.defaultProps = {
  isEditMode: false
};

export default TaskForm;