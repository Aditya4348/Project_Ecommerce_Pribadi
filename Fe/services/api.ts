import axios from 'axios';

// Ambil base URL dari environment variables
const API_URL = import.meta.env.VITE_API_URL_SERVER || 'http://127.0.0.1:8000';

const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor untuk menambahkan token ke header setiap request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor untuk menangani response error (misal: 401 Unauthorized)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token tidak valid atau sudah expired, hapus dari local storage
      localStorage.removeItem('auth_token');
      // Redirect ke halaman login
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    } else if (error.response && error.response.status === 503) {
      // Memicu event global untuk mode maintenance
      window.dispatchEvent(new CustomEvent('maintenanceModeOn'));
    }
    return Promise.reject(error);
  }
);

export default api;