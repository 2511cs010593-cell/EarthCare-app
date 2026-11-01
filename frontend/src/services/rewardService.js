import api from './api';

const rewardService = {
  // Get available rewards in the store
  getRewards: async () => {
    try {
      const response = await api.get('/api/v1/rewards');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Redeem a reward
  redeemReward: async (rewardId) => {
    try {
      const response = await api.post(`/api/v1/rewards/${rewardId}/redeem`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Get user stats (points, coins, XP, level, streak)
  getUserStats: async () => {
    try {
      const response = await api.get('/api/v1/rewards/stats');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Get user badges
  getUserBadges: async () => {
    try {
      const response = await api.get('/api/v1/rewards/badges');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Get leaderboard
  getLeaderboard: async () => {
    try {
      const response = await api.get('/api/v1/rewards/leaderboard');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};

export default rewardService;
