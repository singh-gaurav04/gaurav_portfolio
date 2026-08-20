import axios from "axios";

const TOKEN_KEY = "portfolio-admin-token";

export const getAdminToken = () => sessionStorage.getItem(TOKEN_KEY);

export const setAdminToken = (token) =>
  sessionStorage.setItem(TOKEN_KEY, token);

export const clearAdminToken = () =>
  sessionStorage.removeItem(TOKEN_KEY);

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error("VITE_API_BASE_URL is not configured");
}

const api = axios.create({
  baseURL: API_BASE_URL.replace(/\/$/, ""),
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = getAdminToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => {
    if (response.status === 204) return null;

    const body = response.data;

    if (body && typeof body === "object" && "data" in body) {
      return body.data;
    }

    return body;
  },
  (error) => {
    const payload = error.response?.data;

    const message =
      payload?.error?.message ||
      payload?.detail ||
      error.message ||
      "Request failed";

    return Promise.reject(new Error(message));
  }
);

export default api;