import axios, { type AxiosError } from 'axios';

export const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('securelife_token');

  if (token) {
    config.headers = {
      ...(config.headers || {}),
      Authorization: `Bearer ${token}`,
    };
  }

  return config;
});

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
  },
);

export function friendlyError(
  error: unknown,
  fallback = 'Something went wrong. Please try again.',
) {
  const response = (error as AxiosError<{ message?: string }>)?.response;

  if (response?.status === 403) {
    return 'You do not have permission to do that.';
  }

  if (response?.status === 404) {
    return 'We could not find what you were looking for.';
  }

  if (response?.status && response.status >= 500) {
    return 'Our service is taking a pause. Please try again shortly.';
  }

  return (
    response?.data?.message ||
    (error instanceof Error ? error.message : fallback)
  );
}