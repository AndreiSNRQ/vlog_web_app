import axios from 'axios';

// Define your backend API URL. You can set this in your .env file (e.g., VITE_API_URL=http://localhost:8000/api)
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to handle user login
export const login = async (credentials: { email: string; password: string }) => {
  try {
    const response = await api.post('/login', credentials);
    // Assuming the backend returns a token upon successful login
    const { token } = response.data;
    // Store the token (e.g., in localStorage or a more secure state management)
    localStorage.setItem('authToken', token);
    return response.data;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};

export default api;