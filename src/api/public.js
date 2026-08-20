import api from "./client";

// Portfolio aggregate
export const getPortfolio = () => api.get("/portfolio");

// Profile
export const getProfile = () => api.get("/profile");

// Projects
export const getProjects = () => api.get("/projects");
export const getFeaturedProjects = () => api.get("/projects/featured");
export const getProjectBySlug = (slug) => api.get(`/projects/${slug}`);

// Skills
export const getSkills = () => api.get("/skills");

// Experience
export const getExperiences = () => api.get("/experiences");

// Certifications
export const getCertifications = () => api.get("/certifications");

// Testimonials & feedback
export const getTestimonials = (featured) =>
  api.get("/testimonials", { params: featured != null ? { featured } : undefined });

export const submitFeedback = ({ name, message, email, linkedin_url, avatar }) => {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("message", message);
  if (email) formData.append("email", email);
  if (linkedin_url) formData.append("linkedin_url", linkedin_url);
  if (avatar) formData.append("avatar", avatar);
  return api.post("/feedback", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const getMyRealProjects = () => api.get("/my_real_projects");
export const getServices = () => api.get("/services");
export const getServiceBySlug = (slug) => api.get(`/services/${slug}`);

// Contact & analytics
export const submitContact = (payload) => api.post("/contact", payload);
export const sendEmailOtp = ({ email, purpose }) => api.post("/email-verification/send", { email, purpose });
export const verifyEmailOtp = ({ email, purpose, otp }) => api.post("/email-verification/verify", { email, purpose, otp });
export const trackVisit = (payload) => api.post("/visits", payload);

// Chatbot
export const getChatbotConfig = () => api.get("/chatbot/config");
export const sendChatMessage = (payload) => api.post("/chat", payload);
