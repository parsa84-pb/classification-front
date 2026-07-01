import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL || "";

const API = axios.create({
  baseURL: baseURL,
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('refresh_token');
        if (refreshToken) {
          const response = await axios.post(`${baseURL}/api/auth/refresh/`, {
            refresh: refreshToken,
          });
          localStorage.setItem('access_token', response.data.access);
          originalRequest.headers.Authorization = `Bearer ${response.data.access}`;
          return API(originalRequest);
        }
      } catch (refreshError) {
        localStorage.clear();
        window.location.href = '#/login';
      }
    }
    return Promise.reject(error);
  }
);

export default API;