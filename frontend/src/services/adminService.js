import api from './api';

const adminService = {
  getAdminStats: () => api.get('/admin/stats'),
  getUsers: (search) => api.get('/admin/users', { params: { search } }),
  updateUserRole: (userId, roleData) => api.put(`/admin/users/${userId}/role`, roleData),
  getNews: () => api.get('/admin/news'),
  createNews: (data) => api.post('/admin/news', data),
  updateNews: (id, data) => api.put(`/admin/news/${id}`, data),
  deleteNews: (id) => api.delete(`/admin/news/${id}`),
  getTreeApprovals: () => api.get('/admin/tree-approvals'),
  approveTree: (id) => api.put(`/admin/tree-approvals/${id}/approve`),
  rejectTree: (id, data) => api.put(`/admin/tree-approvals/${id}/reject`, data),
  getWasteReports: () => api.get('/admin/waste-reports'),
  resolveWaste: (id) => api.put(`/admin/waste-reports/${id}/resolve`),
  getChallenges: () => api.get('/admin/challenges'),
  createChallenge: (data) => api.post('/admin/challenges', data),
  updateChallenge: (id, data) => api.put(`/admin/challenges/${id}`, data),
  deleteChallenge: (id) => api.delete(`/admin/challenges/${id}`),
  getEvents: () => api.get('/admin/events'),
  createEvent: (data) => api.post('/admin/events', data),
  updateEvent: (id, data) => api.put(`/admin/events/${id}`, data),
  deleteEvent: (id) => api.delete(`/admin/events/${id}`),
  getPollutionData: () => api.get('/admin/pollution'),
  createPollutionEntry: (data) => api.post('/admin/pollution', data),
  updatePollutionEntry: (id, data) => api.put(`/admin/pollution/${id}`, data),
  deletePollutionEntry: (id) => api.delete(`/admin/pollution/${id}`),
  getContacts: () => api.get('/admin/contacts'),
  broadcastNotification: (data) => api.post('/admin/notifications/broadcast', data),
};

export default adminService;
