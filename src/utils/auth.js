import apiClient from './api';

// ==================== AUTH FUNCTIONS ====================

// Login
export const loginUser = async (email, password) => {
  try {
    const { data } = await apiClient.post('/auth/login', { email, password });

    if (data.token) {
      localStorage.setItem('token', data.token);
      if (data.refreshToken) {
        localStorage.setItem('refreshToken', data.refreshToken);
      }
      if (data.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
      }
    }

    return data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

// Register
export const registerUser = async (formData) => {
  try {
    const { data } = await apiClient.post('/auth/register', formData);
    return data;
  } catch (error) {
    console.error('Register error:', error);
    throw error;
  }
};

// Logout
export const logoutUser = async () => {
  try {
    const token = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refreshToken');
    if (token) {
      // Try to logout on server, but don't fail if it doesn't work
      try {
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const body = refreshToken ? { token: refreshToken } : null;
        await apiClient.post('/auth/logout', body, config);
      } catch (logoutError) {
        // Silently ignore logout errors - token will be cleared locally anyway
        console.log('Server logout skipped (token may be expired)');
      }
    }
  } catch (error) {
    // If logout fails (e.g. token already invalid), still clear local storage.
    console.error('Logout error:', error);
  } finally {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
  }
};

// Get current user
export const getCurrentUser = () => {
  if (typeof window !== 'undefined') {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
  return null;
};

// Check auth status
export const isAuthenticated = () => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    return !!token;
  }
  return false;
};

// Get token
export const getToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};

export { apiClient };
