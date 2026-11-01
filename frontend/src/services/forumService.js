import api from './api';

const forumService = {
  // Get paginated forum posts with search
  getPosts: async (search = '', page = 0, size = 10) => {
    try {
      const response = await api.get('/api/v1/forum/posts', {
        params: {
          search,
          page,
          size,
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Get a specific post with comments
  getPostById: async (postId) => {
    try {
      const response = await api.get(`/api/v1/forum/posts/${postId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Create a new post
  createPost: async (data) => {
    try {
      const response = await api.post('/api/v1/forum/posts', data);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Delete a post
  deletePost: async (postId) => {
    try {
      const response = await api.delete(`/api/v1/forum/posts/${postId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Add a comment to a post
  addComment: async (postId, data) => {
    try {
      const response = await api.post(`/api/v1/forum/posts/${postId}/comments`, data);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Like a post
  likePost: async (postId) => {
    try {
      const response = await api.post(`/api/v1/forum/posts/${postId}/like`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};

export default forumService;
