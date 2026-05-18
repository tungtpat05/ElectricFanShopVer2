import axios from "axios";

export const axiosClient = axios.create({
  baseURL: "/api/v1",
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
    // If token is expired (401), remove it and redirect (but not on login/register pages)
    if (error.response?.status === 401) {
      const currentPath = window.location.pathname;
      // Only redirect if not already on login or register page
      if (currentPath !== "/login" && currentPath !== "/register") {
        localStorage.removeItem("authToken");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
