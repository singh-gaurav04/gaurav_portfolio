import api from "./client";

// Auth
export const login = (email, password) => api.post("/auth/login", { email, password });
export const logout = () => api.post("/auth/logout");
export const getMe = () => api.get("/auth/me");
export const changePassword = (payload) => api.post("/auth/change-password", payload);

// Dashboard
export const getDashboard = () => api.get("/admin/dashboard");

// Profile
export const getAdminProfile = () => api.get("/admin/profile");
export const updateAdminProfile = (payload) => api.put("/admin/profile", payload);

// Generic CRUD helpers
export const listAdmin = (resource) => api.get(`/admin/${resource}`);
export const createAdmin = (resource, payload) => api.post(`/admin/${resource}`, payload);
export const updateAdmin = (resource, id, payload) => api.put(`/admin/${resource}/${id}`, payload);
export const deleteAdmin = (resource, id) => api.delete(`/admin/${resource}/${id}`);

// Projects
export const getAdminProject = (id) => api.get(`/admin/projects/${id}`);
export const toggleProjectPublish = (id) => api.patch(`/admin/projects/${id}/publish`);
export const toggleProjectFeature = (id) => api.patch(`/admin/projects/${id}/feature`);
export const uploadProjectFeaturedImage = (id, file) => {
  const formData = new FormData();
  formData.append("file", file);
  return api.post(`/admin/projects/${id}/featured-image`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const uploadServiceFeaturedImage = (id, file) => {
  const formData = new FormData();
  formData.append("file", file);
  return api.post(`/admin/services/${id}/featured-image`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const uploadProjectGalleryImage = (id, file) => {
  const formData = new FormData();
  formData.append("file", file);
  return api.post(`/admin/projects/${id}/gallery`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const deleteProjectGalleryImage = (id, fileId) =>
  api.delete(`/admin/projects/${id}/gallery/${encodeURIComponent(fileId)}`);

export const uploadServiceGalleryImage = (id, file) => {
  const formData = new FormData();
  formData.append("file", file);
  return api.post(`/admin/services/${id}/gallery`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const deleteServiceGalleryImage = (id, fileId) =>
  api.delete(`/admin/services/${id}/gallery/${encodeURIComponent(fileId)}`);

// Skills
export const getAdminSkill = (id) => api.get(`/admin/skills/${id}`);

// Testimonials
export const createTestimonial = (payload) => api.post("/admin/testimonials", payload);
export const approveTestimonial = (id) => api.patch(`/admin/testimonials/${id}/approve`);
export const rejectTestimonial = (id) => api.patch(`/admin/testimonials/${id}/reject`);
export const featureTestimonial = (id) => api.patch(`/admin/testimonials/${id}/feature`);
export const updateTestimonial = (id, payload) => api.put(`/admin/testimonials/${id}`, payload);
export const deleteTestimonial = (id) => api.delete(`/admin/testimonials/${id}`);

// Contacts
export const getContact = (id) => api.get(`/admin/contacts/${id}`);
export const markContactRead = (id) => api.patch(`/admin/contacts/${id}/read`);
export const archiveContact = (id) => api.patch(`/admin/contacts/${id}/archive`);
export const replyContact = (id, message) => api.patch(`/admin/contacts/${id}/reply`, { message });

// Email templates
export const listTemplates = () => api.get("/admin/email-templates");
export const updateTemplate = (id, payload) => api.put(`/admin/email-templates/${id}`, payload);

// Media
export const uploadMedia = (file, folder = "/portfolio/general/") => {
  const formData = new FormData();
  formData.append("file", file);
  return api.post(`/admin/media/upload?folder=${encodeURIComponent(folder)}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const uploadDocument = (file, folder = "/portfolio/documents/") => {
  const formData = new FormData();
  formData.append("file", file);
  return api.post(`/admin/media/upload-file?folder=${encodeURIComponent(folder)}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
export const deleteMedia = (id) => api.delete(`/admin/media/${id}`);

// Chatbot / RAG
export const listChatbotDocuments = () => api.get("/admin/chatbot/documents");
export const getChatbotAdminConfig = () => api.get("/admin/chatbot/config");
export const updateChatbotAdminConfig = (payload) => api.put("/admin/chatbot/config", payload);
export const uploadChatbotDocument = (file) => {
  const formData = new FormData();
  formData.append("file", file);
  return api.post("/admin/chatbot/documents", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
export const deleteChatbotDocument = (id) => api.delete(`/admin/chatbot/documents/${id}`);
