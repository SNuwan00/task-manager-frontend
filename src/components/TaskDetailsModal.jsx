import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../services/api';

function TaskDetailsModal({ task, onClose }) {
  const [fullTaskDetails, setFullTaskDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatingStatus, setUpdatingStatus] = useState(false); // For status update loading state
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchTaskDetails = async () => {
      // Get the taskId from the task object
      const taskId = task.taskId;
      
      if (!taskId && taskId !== 0) {
        console.log("No taskId found, using provided task:", task);
        setFullTaskDetails(task);
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        console.log(`Fetching task details for ID: ${taskId}`);
        const response = await apiClient.get(`/tasks/${taskId}/details`);
        console.log("API Response:", response.data);
        setFullTaskDetails(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching task details:', err);
        setError('Failed to load task details');
        setFullTaskDetails(task); // Fallback to the basic task info
      } finally {
        setLoading(false);
      }
    };
    
    fetchTaskDetails();
  }, [task]);
  
  // Use the full details if available, otherwise use the original task
  const displayTask = fullTaskDetails || task;
  
  // Handle Edit button click
  const handleEditClick = () => {
    const taskId = displayTask.taskId;
    
    // Debug log to verify taskId
    console.log("Navigating to edit task with ID:", taskId);
    
    if (!taskId && taskId !== 0) {
      console.error("Cannot navigate: No taskId available in task", displayTask);
      return;
    }
    
    // Close the modal first
    onClose();
    
    // Use setTimeout to ensure the modal is closed before navigation
    setTimeout(() => {
      // Navigate to the edit page
      navigate(`/tasks/edit/${taskId}`);
      
      // Log for debugging
      console.log("Navigation attempted to:", `/tasks/edit/${taskId}`);
    }, 100);
  };
  
  // New function to update task status
  const updateTaskStatus = async (newStatus) => {
    const taskId = displayTask.taskId;
    
    if (!taskId && taskId !== 0) {
      console.error("Cannot update status: No taskId available");
      return;
    }
    
    // Don't update if it's the same status
    if (displayTask.userStatus === newStatus) {
      return;
    }
    
    try {
      setUpdatingStatus(true);
      console.log(`Updating task ${taskId} status to: ${newStatus}`);
      
      const response = await apiClient.put(`/task-status/${taskId}`, {
        userStatus: newStatus
      });
      
      console.log("Status update response:", response.data);
      
      // Update the local task data
      setFullTaskDetails({
        ...fullTaskDetails,
        userStatus: newStatus
      });
      
    } catch (err) {
      console.error('Error updating task status:', err);
      setError('Failed to update task status');
    } finally {
      setUpdatingStatus(false);
    }
  };
  
  // Format date to be more readable
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString();
    } catch (e) {
      return dateString;
    }
  };

  // Map status to colors
  const getStatusColor = (status) => {
    const statusColors = {
      'NOT_STARTED': 'bg-yellow-400',
      'STARTED': 'bg-green-400',
      'DONE': 'bg-green-900'
    };
    return statusColors[status] || 'bg-gray-300';
  };

  // Map time status to colors
  const getTimeColor = (status) => {
    const timeColors = {
      'UPCOMING': 'bg-blue-300',
      'DUE_TODAY': 'bg-orange-400',
      'OVERDUE': 'bg-red-500',
      'ENDED': 'bg-gray-500'
    };
    return timeColors[status] || 'bg-gray-300';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-lg overflow-hidden">
        {/* Header */}
        <div className="border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex justify-between items-center">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            Task Details
          </h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Content */}
        <div className="p-6">
          {loading ? (
            <div className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-400">Loading task details...</p>
            </div>
          ) : (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">{displayTask.title}</h2>
              
              {/* Task Status Section - Now with Quick Toggle */}
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">Task Status</h4>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => updateTaskStatus('NOT_STARTED')}
                    disabled={updatingStatus || displayTask.userStatus === 'NOT_STARTED'}
                    className={`px-3 py-2 rounded-md flex items-center gap-2 transition-colors ${
                      displayTask.userStatus === 'NOT_STARTED'
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200 border-2 border-yellow-400'
                        : 'bg-gray-100 hover:bg-yellow-50 text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-300'
                    }`}
                  >
                    <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
                    Not Started
                  </button>
                  
                  <button
                    onClick={() => updateTaskStatus('STARTED')}
                    disabled={updatingStatus || displayTask.userStatus === 'STARTED'}
                    className={`px-3 py-2 rounded-md flex items-center gap-2 transition-colors ${
                      displayTask.userStatus === 'STARTED'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200 border-2 border-green-400'
                        : 'bg-gray-100 hover:bg-green-50 text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-300'
                    }`}
                  >
                    <span className="w-3 h-3 rounded-full bg-green-400"></span>
                    Started
                  </button>
                  
                  <button
                    onClick={() => updateTaskStatus('DONE')}
                    disabled={updatingStatus || displayTask.userStatus === 'DONE'}
                    className={`px-3 py-2 rounded-md flex items-center gap-2 transition-colors ${
                      displayTask.userStatus === 'DONE'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200 border-2 border-green-900'
                        : 'bg-gray-100 hover:bg-green-50 text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-300'
                    }`}
                  >
                    <span className="w-3 h-3 rounded-full bg-green-900"></span>
                    Done
                  </button>
                </div>
                
                {updatingStatus && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    Updating status...
                  </p>
                )}
              </div>
              
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-2">
                  <span className={`w-3 h-3 rounded-full ${getStatusColor(displayTask.userStatus)}`}></span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {displayTask.userStatus?.replace(/_/g, ' ')}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`w-3 h-3 rounded-full ${getTimeColor(displayTask.timeStatus)}`}></span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {displayTask.timeStatus?.replace(/_/g, ' ')}
                  </span>
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mt-4">
                <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Description</h4>
                <p className="text-gray-600 dark:text-gray-400 whitespace-pre-line">
                  {displayTask.description || 'No description provided'}
                </p>
              </div>
              
              {(displayTask.startDate || displayTask.endDate) && (
                <div className="grid grid-cols-2 gap-4 mt-4">
                  {displayTask.startDate && (
                    <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                      <h4 className="text-sm font-medium text-gray-800 dark:text-gray-200">Start Date</h4>
                      <p className="text-gray-600 dark:text-gray-400">{formatDate(displayTask.startDate)}</p>
                      <p className="text-gray-600 dark:text-gray-400">{displayTask.startTime || 'N/A'}</p>
                    </div>
                  )}
                  {displayTask.endDate && (
                    <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                      <h4 className="text-sm font-medium text-gray-800 dark:text-gray-200">End Date</h4>
                      <p className="text-gray-600 dark:text-gray-400">{formatDate(displayTask.endDate)}</p>
                      <p className="text-gray-600 dark:text-gray-400">{displayTask.endTime || 'N/A'}</p>
                    </div>
                  )}
                </div>
              )}
              
              {error && (
                <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg mt-4">
                  <p className="text-red-600 dark:text-red-400">{error}</p>
                  <p className="text-sm text-red-500 dark:text-red-300 mt-1">
                    Showing limited information. Some details may be missing.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* Footer with Edit button */}
        <div className="border-t border-gray-200 dark:border-gray-700 px-6 py-4 flex justify-between">
          <button
            onClick={onClose}
            className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium py-2 px-4 rounded-md transition-colors"
          >
            Close
          </button>
          <button
            onClick={handleEditClick}
            disabled={loading}
            className="bg-primary hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Edit Task
          </button>
        </div>
      </div>
    </div>
  );
}

TaskDetailsModal.propTypes = {
  task: PropTypes.shape({
    taskId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string.isRequired,
    userStatus: PropTypes.string,
    timeStatus: PropTypes.string,
    description: PropTypes.string,
    startDate: PropTypes.string,
    startTime: PropTypes.string,
    endDate: PropTypes.string,
    endTime: PropTypes.string
  }).isRequired,
  onClose: PropTypes.func.isRequired
};

export default TaskDetailsModal;