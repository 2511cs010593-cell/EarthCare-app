import api from './api';

const newsService = {
  // Get news with pagination, category filter, and search
  // Accepts both (params object) and (category, search, page, size) signatures
  getNews: async (categoryOrParams = '', search = '', page = 0, size = 10) => {
    try {
      let params;
      if (typeof categoryOrParams === 'object' && categoryOrParams !== null) {
        params = categoryOrParams;
      } else {
        params = { category: categoryOrParams, search, page, size };
      }
      const response = await api.get('/api/v1/news', { params });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Get a specific news article
  getNewsById: async (newsId) => {
    try {
      const response = await api.get(`/api/v1/news/${newsId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Create a news article (admin)
  createNews: async (data) => {
    try {
      const response = await api.post('/api/v1/admin/news', data);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Update a news article (admin)
  updateNews: async (newsId, data) => {
    try {
      const response = await api.put(`/api/v1/admin/news/${newsId}`, data);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Delete a news article (admin)
  deleteNews: async (newsId) => {
    try {
      const response = await api.delete(`/api/v1/admin/news/${newsId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};

export default newsService;
