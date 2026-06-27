import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const login = async (credentials: { email: string; password: string }) => {
  const response = await api.post('/login', credentials);
  const { token } = response.data;

  if (token) {
    localStorage.setItem('authToken', token);
  }

  return response.data;
};

export const register = async (payload: { name: string; email: string; password: string }) => {
  const response = await api.post('/register', payload);
  const { token } = response.data;

  if (token) {
    localStorage.setItem('authToken', token);
  }

  return response.data;
};

export const logout = async () => {
  try {
    await api.post('/logout');
  } finally {
    localStorage.removeItem('authToken');
  }
};

export default api;