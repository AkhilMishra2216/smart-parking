import axios from 'axios';
const getApiUrl = () => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  if (import.meta.env.DEV) {
    return ''; 
  }
  return 'http://localhost:5000';
};
const api = axios.create({
  baseURL: getApiUrl(),
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, 
});
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (!error.response) {
      error.message = 'Network error. Please check your connection.';
    } else {
      const { status, data } = error.response;
      if (status >= 500) {
        error.message = 'Server error. Please try again later.';
      } else if (status === 404) {
        error.message = 'Resource not found.';
      } else if (status === 429) {
        error.message = 'Too many requests. Please wait a moment.';
      } else if (data?.error) {
        error.message = data.error;
      } else {
        error.message = 'An error occurred. Please try again.';
      }
    }
    return Promise.reject(error);
  }
);
export const registerVehicle = async (vehicleData) => {
  try {
    const response = await api.post('/api/register', vehicleData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const scanQRCode = async (scanData) => {
  try {
    const response = await api.post('/api/scan', scanData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getDashboardData = async (vehicleId) => {
  try {
    const response = await api.get(`/api/dashboard/${vehicleId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export default api;