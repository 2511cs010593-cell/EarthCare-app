import api from './api';

const eventService = {
  // Get all upcoming events
  getUpcomingEvents: async () => {
    try {
      const response = await api.get('/api/v1/events');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Register for an event
  registerForEvent: async (eventId) => {
    try {
      const response = await api.post(`/api/v1/events/${eventId}/register`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Get user's registered events
  getUserRegisteredEvents: async () => {
    try {
      const response = await api.get('/api/v1/events/my');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Get all events (admin)
  getEvents: async () => {
    try {
      const response = await api.get('/api/v1/admin/events');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Create an event (admin)
  createEvent: async (data) => {
    try {
      const response = await api.post('/api/v1/admin/events', data);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Update an event (admin)
  updateEvent: async (eventId, data) => {
    try {
      const response = await api.put(`/api/v1/admin/events/${eventId}`, data);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Delete an event (admin)
  deleteEvent: async (eventId) => {
    try {
      const response = await api.delete(`/api/v1/admin/events/${eventId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};

export default eventService;
