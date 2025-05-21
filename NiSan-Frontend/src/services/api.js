import axios from 'axios';
import { getToken, clearTokens } from './auth';

const API_URL = 'http://localhost:8000';

// Create axios instance with base URL
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to add the auth token to requests
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

// Add a response interceptor to handle unauthorized errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // Clear tokens and redirect to login
            clearTokens();
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// Auth API calls
export const registerUser = (userData) => {
    return api.post('/users/register/', userData);
};

export const loginUser = (credentials) => {
    return api.post('/users/login/', credentials);
};

// Diary pages API calls
export const getAllPages = () => {
    return api.get('/diary/pages/');
};

export const getPageById = (id) => {
    return api.get(`/diary/pages/${id}/`);
};

export const createPage = (pageData) => {
    return api.post('/diary/pages/', pageData);
};

export const updatePage = (id, pageData) => {
    return api.put(`/diary/pages/${id}/`, pageData);
};

export const deletePage = (id) => {
    return api.delete(`/diary/pages/${id}/`);
};

export const searchPages = (query) => {
    return api.get(`/diary/pages/?search=${query}`);
};

export default api;