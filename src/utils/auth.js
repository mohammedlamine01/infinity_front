import { authAPI } from './api';

// ==================== AUTH FUNCTIONS ====================

// Login
export const loginUser = async (email, password) => {
  try {
    const response = await authAPI.login({ email, password });
    const data = response.data;

    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user || {}));
    }

    return data;
  } catch (error) {
    console.error('Login error:', error.response?.data || error.message);
    throw error;
  }
};

// Register
export const registerUser = async (formData) => {
  try {
    // Map form data to match API requirements
    const apiPayload = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      password_confirmation: formData.confirmPassword || formData.password_confirmation,
      bio: formData.bio || '',
      phone: formData.phone || '',
      id_sp: formData.id_sp || null,
    };
    
    const response = await authAPI.register(apiPayload);
    const data = response.data;
    
    // If token is provided after registration, auto-login
    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user || {}));
    }
    
    return data;
  } catch (error) {
    console.error('Register error:', error.response?.data || error.message);
    throw error;
  }
};

// Logout
export const logoutUser = async () => {
  try {
    const token = localStorage.getItem('token');
    if (token) {
      // Try to logout on server, but don't fail if it doesn't work
      try {
        await authAPI.logout();
      } catch (logoutError) {
        // Silently ignore logout errors - token will be cleared locally anyway
        console.log('Server logout skipped (token may be expired)');
      }
    }
  } catch (error) {
    // If logout fails, still clear local storage.
    console.error('Logout error:', error);
  } finally {
    localStorage.removeItem('token');
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

// Get user role
export const getUserRole = () => {
  const user = getCurrentUser();
  return user?.role || 'visiteur';
};

// Check if user is admin
export const isAdmin = () => {
  const role = getUserRole();
  return role === 'admin';
};

// Update user profile
export const updateUserProfile = async (id, userData) => {
  try {
    const response = await authAPI.updateUser(id, userData);
    const data = response.data;
    
    if (data.user) {
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    
    return data;
  } catch (error) {
    console.error('Update profile error:', error);
    throw error;
  }
};

// Fetch current user data from API
export const fetchCurrentUser = async () => {
  try {
    const response = await authAPI.getUser();
    const user = response.data.user || response.data;
    
    localStorage.setItem('user', JSON.stringify(user));
    
    return user;
  } catch (error) {
    console.error('Fetch user error:', error);
    throw error;
  }
};

export { authAPI };
