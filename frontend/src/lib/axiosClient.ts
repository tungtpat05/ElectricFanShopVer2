import axios from "axios";

export const axiosClient = axios.create({
  baseURL: "/api",
  timeout: 5000,
});

// Add token to request headers automatically
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle response errors
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // If token is expired (401), remove it
    if (error.response?.status === 401) {
      localStorage.removeItem("authToken");
      // Optionally redirect to login page
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
