import api from './api';

const notificationService = {
  // Get all notifications for the current user
  getNotifications: async () => {
    try {
      const response = await api.get('/api/v1/notifications');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Mark a notification as read
  markAsRead: async (notificationId) => {
    try {
      const response = await api.put(`/api/v1/notifications/${notificationId}/read`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Get unread notification count
  getUnreadCount: async () => {
    try {
      const response = await api.get('/api/v1/notifications/unread-count');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Broadcast notification to all users (admin)
  broadcastNotification: async (data) => {
    try {
      const response = await api.post('/api/v1/admin/notifications/broadcast', data);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};

export default notificationService;
