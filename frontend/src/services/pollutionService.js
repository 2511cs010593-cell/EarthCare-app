import api from './api';

const pollutionService = {
  // Get pollution data by type and date range
  getPollutionData: async (type, from, to) => {
    try {
      const response = await api.get('/api/v1/pollution', {
        params: {
          type,
          from,
          to,
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Create pollution data entry (admin)
  createPollutionEntry: async (data) => {
    try {
      const response = await api.post('/api/v1/admin/pollution', data);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Update pollution data entry (admin)
  updatePollutionEntry: async (entryId, data) => {
    try {
      const response = await api.put(`/api/v1/admin/pollution/${entryId}`, data);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Delete pollution data entry (admin)
  deletePollutionEntry: async (entryId) => {
    try {
      const response = await api.delete(`/api/v1/admin/pollution/${entryId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};

export default pollutionService;
