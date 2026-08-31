import axios, { type AxiosError } from 'axios';

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  'http://localhost:8080/api/v1';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});


// Add JWT token automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('securelife_token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


// Handle API errors globally
api.interceptors.response.use(
  (response) => response,

  (error: unknown) => {

    const axiosError = error as AxiosError;

    if (axiosError.response?.status === 401) {

      localStorage.removeItem('securelife_token');
      localStorage.removeItem('securelife_session');

      if (window.location.pathname !== '/login') {
        window.location.assign('/login');
      }
    }

    return Promise.reject(error);
  }
);


// User-friendly error messages
export function friendlyError(
  error: unknown,
  fallback = 'Something went wrong. Please try again.',
) {

  const axiosError =
    error as AxiosError<{ message?: string }>;

  const response = axiosError.response;


  if (response?.status === 400) {
    return (
      response.data?.message ||
      'Invalid request. Please check your input.'
    );
  }


  if (response?.status === 401) {
    return 'Session expired. Please login again.';
  }


  if (response?.status === 403) {
    return 'You do not have permission to perform this action.';
  }


  if (response?.status === 404) {
    return 'Requested data was not found.';
  }


  if (response?.status && response.status >= 500) {
    return 'Server error. Please try again later.';
  }


  return (
    response?.data?.message ||
    (error instanceof Error
      ? error.message
      : fallback)
  );
}
