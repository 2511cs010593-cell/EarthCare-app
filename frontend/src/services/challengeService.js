import api from './api';

const challengeService = {
  // Get all active challenges
  getActiveChallenges: async () => {
    try {
      const response = await api.get('/api/v1/challenges');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Join a challenge
  joinChallenge: async (challengeId) => {
    try {
      const response = await api.post(`/api/v1/challenges/${challengeId}/join`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Get user's challenges
  getUserChallenges: async () => {
    try {
      const response = await api.get('/api/v1/challenges/my');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Get all challenges (admin)
  getChallenges: async () => {
    try {
      const response = await api.get('/api/v1/admin/challenges');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Create a challenge (admin)
  createChallenge: async (data) => {
    try {
      const response = await api.post('/api/v1/admin/challenges', data);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Update a challenge (admin)
  updateChallenge: async (challengeId, data) => {
    try {
      const response = await api.put(`/api/v1/admin/challenges/${challengeId}`, data);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Delete a challenge (admin)
  deleteChallenge: async (challengeId) => {
    try {
      const response = await api.delete(`/api/v1/admin/challenges/${challengeId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};

export default challengeService;
