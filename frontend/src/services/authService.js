import api from './api';

const authService = {
  // Register a new user
  register: async (data) => {
    try {
      const response = await api.post('/api/v1/auth/register', data);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Login with credentials
  login: async (credentials) => {
    try {
      const response = await api.post('/api/v1/auth/login', {
        usernameOrEmail: credentials.usernameOrEmail || credentials.email,
        password: credentials.password,
        rememberMe: credentials.rememberMe,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Logout (clear tokens on client side)
  logout: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('refreshToken');
  },

  // Refresh token
  refreshToken: async (refreshToken) => {
    try {
      const response = await api.post('/api/v1/auth/refresh', { refreshToken });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Forgot password - request reset email
  forgotPassword: async (email) => {
    try {
      const response = await api.post('/api/v1/auth/forgot-password', { email });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Reset password with token
  resetPassword: async (data) => {
    try {
      const response = await api.post('/api/v1/auth/reset-password', data);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Change password for authenticated user
  changePassword: async (data) => {
    try {
      const response = await api.put('/api/v1/auth/change-password', data);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Update user profile
  updateProfile: async (data, photo = null) => {
    try {
      const formData = new FormData();
      formData.append('fullName', data.fullName);
      formData.append('mobileNumber', data.mobileNumber);
      if (photo) {
        formData.append('profilePhoto', photo);
      }

      const response = await api.put('/api/v1/auth/profile', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Get current user profile
  getCurrentUser: async () => {
    try {
      const response = await api.get('/api/v1/auth/profile');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};

export default authService;
