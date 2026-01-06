import axios from 'axios';

// Get API URL from environment variable or use default
const getApiUrl = () => {
  // In production, VITE_API_URL should be set
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  // In development, use proxy or localhost
  if (import.meta.env.DEV) {
    return ''; // Use Vite proxy in development
  }
  // Fallback for production without env var
  return 'http://localhost:5000';
};

// Create axios instance with base URL
const api = axios.create({
  baseURL: getApiUrl(),
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle network errors
    if (!error.response) {
      error.message = 'Network error. Please check your connection.';
    } else {
      // Handle API errors
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

// API functions
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

