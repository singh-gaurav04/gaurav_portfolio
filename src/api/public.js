import api from "./client";

// Contact form (mail)
export const submitContact = (payload) => api.post("/contact", payload);
export const sendEmailOtp = ({ email, purpose }) => api.post("/email-verification/send", { email, purpose });
export const verifyEmailOtp = ({ email, purpose, otp }) => api.post("/email-verification/verify", { email, purpose, otp });

// Chatbot
export const sendChatMessage = (payload) => api.post("/chat", payload);
