import api from './api';

const taskService = {
  // Get available tasks for current user
  getAvailableTasks: async () => {
    try {
      const response = await api.get('/api/v1/tasks');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Complete a task
  completeTask: async (taskId) => {
    try {
      const response = await api.post(`/api/v1/tasks/${taskId}/complete`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Get task progress for current user
  getTaskProgress: async () => {
    try {
      const response = await api.get('/api/v1/tasks/progress');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};

export default taskService;
