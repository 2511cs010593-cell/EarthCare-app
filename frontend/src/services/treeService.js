import api from './api';

const treeService = {
  // Submit a tree plantation record
  submitTreePlantation: async (data, photo) => {
    try {
      const formData = new FormData();
      formData.append('treeName', data.treeName);
      formData.append('location', data.location);
      formData.append('plantationDate', data.plantationDate);
      formData.append('description', data.description);
      if (photo) {
        formData.append('photo', photo);
      }

      const response = await api.post('/api/v1/tree', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Get user's tree submissions
  getUserSubmissions: async () => {
    try {
      const response = await api.get('/api/v1/tree/my');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Get all pending tree submissions (admin)
  getTreeApprovals: async () => {
    try {
      const response = await api.get('/api/v1/admin/tree-approvals');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Approve a tree submission (admin)
  approveTree: async (treeId) => {
    try {
      const response = await api.put(`/api/v1/admin/tree-approvals/${treeId}/approve`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Reject a tree submission (admin)
  rejectTree: async (treeId, reason) => {
    try {
      const response = await api.put(`/api/v1/admin/tree-approvals/${treeId}/reject`, {
        rejectionReason: reason,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};

export default treeService;
