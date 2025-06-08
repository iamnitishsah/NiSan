import axios from 'axios';
import { getToken, clearTokens } from './auth';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor for auth token
api.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            clearTokens();
            // Use window.location instead of navigate to ensure complete reload
            window.location.href = '/login?sessionExpired=true';
        }
        return Promise.reject(error);
    }
);

// Auth API
export const registerUser = (userData) => api.post('/users/register/', userData);
export const loginUser = (credentials) => api.post('/users/login/', credentials);

// Diary API
export const getAllPages = () => api.get('/diary/pages/');
export const getPageById = (id) => api.get(`/diary/pages/${id}/`);
export const createPage = (pageData) => api.post('/diary/pages/', pageData);
export const updatePage = (id, pageData) => api.put(`/diary/pages/${id}/`, pageData);
export const deletePage = (id) => api.delete(`/diary/pages/${id}/`);
export const searchPages = (query) => api.get(`/diary/pages/?search=${query}`);

export default api;