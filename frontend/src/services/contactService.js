import api from './api';

const contactService = {
  // Submit a contact form
  submitContact: async (data) => {
    try {
      const response = await api.post('/api/v1/contact', data);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};

export default contactService;
