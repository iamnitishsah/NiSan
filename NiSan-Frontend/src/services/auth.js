// Token storage keys
const ACCESS_TOKEN_KEY = 'diary_access_token';
const REFRESH_TOKEN_KEY = 'diary_refresh_token';
const USER_KEY = 'diary_user';

// Save tokens to localStorage
export const saveTokens = (accessToken, refreshToken) => {
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
};

// Save user data to localStorage
export const saveUser = (user) => {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
};

// Get access token from localStorage
export const getToken = () => {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
};

// Get refresh token from localStorage
export const getRefreshToken = () => {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
};

// Get user data from localStorage
export const getUser = () => {
    const userStr = localStorage.getItem(USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
};

// Check if user is authenticated
export const isAuthenticated = () => {
    return !!getToken();
};

// Clear all authentication data from localStorage
export const clearTokens = () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
};

// Parse JWT token to get user information
export const parseJwt = (token) => {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
        return null;
    }
};