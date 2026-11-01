import api from './api';

const wasteService = {
  // Submit a garbage/waste report
  submitGarbageReport: async (data, photo) => {
    try {
      const formData = new FormData();
      formData.append('locationDescription', data.locationDescription);
      formData.append('latitude', data.latitude || '');
      formData.append('longitude', data.longitude || '');
      formData.append('severityLevel', data.severityLevel);
      if (photo) {
        formData.append('photo', photo);
      }

      const response = await api.post('/api/v1/waste', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Get user's waste reports
  getUserReports: async () => {
    try {
      const response = await api.get('/api/v1/waste/my');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Get all waste reports (admin)
  getWasteReports: async () => {
    try {
      const response = await api.get('/api/v1/admin/waste-reports');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Resolve a waste report (admin)
  resolveReport: async (reportId) => {
    try {
      const response = await api.put(`/api/v1/admin/waste-reports/${reportId}/resolve`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};

export default wasteService;
