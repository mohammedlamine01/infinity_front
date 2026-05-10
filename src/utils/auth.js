import { authAPI } from './api';
import { 
  getTokenCookie,
  getUserCookie,
  getRoleCookie,
  setRoleCookie, 
  setUserIdCookie, 
  setUserNameCookie, 
  setTokenCookie,
  setUserCookie,
  clearAuthCookies 
} from './cookies';

// Login
export const loginUser = async (email, password) => {
  try {
    const response = await authAPI.login({ email, password });
    const data = response.data;
    if (data.token) {
      const user = data.user || {};
      setTokenCookie(data.token);
      setUserCookie(user);
      if (user.role) setRoleCookie(user.role);
      if (user.id) setUserIdCookie(user.id);
      if (user.name) setUserNameCookie(user.name);
      else if (user.prenom && user.nom) {
        setUserNameCookie(`${user.prenom} ${user.nom}`);
      }
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
    if (data.token) {
      const user = data.user || {};
      setTokenCookie(data.token);
      setUserCookie(user);
      if (user.role) setRoleCookie(user.role);
      if (user.id) setUserIdCookie(user.id);
      if (user.name) setUserNameCookie(user.name);
      else if (user.prenom && user.nom) {
        setUserNameCookie(`${user.prenom} ${user.nom}`);
      }
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
    const token = getToken();
    if (token) {
      try {
        await authAPI.logout();
      } catch (logoutError) {
        console.log('Server logout skipped (token may be expired)');
      }
    }
  } catch (error) {
    console.error('Logout error:', error);
  } finally {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('refreshToken');
    }
    clearAuthCookies();
  }
};

// Get current user
export const getCurrentUser = () => {
  if (typeof window !== 'undefined') {
    return getUserCookie();
  }
  return null;
};

// Check auth status
export const isAuthenticated = () => {
  if (typeof window !== 'undefined') {
    const token = getTokenCookie();
    return !!token;
  }
  return false;
};

// Get token
export const getToken = () => {
  if (typeof window !== 'undefined') {
    return getTokenCookie();
  }
  return null;
};

// Get user role
export const getUserRole = () => {
  const user = getCurrentUser();
  return user?.role || 'visiteur';
};

// Get user role from cookie
export const getUserRoleFromCookie = () => {
  if (typeof window !== 'undefined') {
    return getRoleCookie() || 'visiteur';
  }
  return 'visiteur';
};

// Check if user is admin
export const isAdmin = () => {
  const role = getUserRole();
  return role === 'admin';
};

// Check if user is admin from cookie
export const isAdminFromCookie = () => {
  if (typeof window !== 'undefined') {
    return getRoleCookie()?.trim().toLowerCase() === 'admin';
  }
  return false;
};

// Update user profile
export const updateUserProfile = async (id, userData) => {
  try {
    const response = await authAPI.updateUser(id, userData);
    const data = response.data;
    if (data.user) {
      setUserCookie(data.user);
      if (data.user.role) setRoleCookie(data.user.role);
      if (data.user.id) setUserIdCookie(data.user.id);
      if (data.user.name) setUserNameCookie(data.user.name);
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
    setUserCookie(user);
    if (user.role) setRoleCookie(user.role);
    if (user.id) setUserIdCookie(user.id);
    if (user.name) setUserNameCookie(user.name);
    else if (user.prenom && user.nom) {
      setUserNameCookie(`${user.prenom} ${user.nom}`);
    }
    return user;
  } catch (error) {
    console.error('Fetch user error:', error);
    throw error;
  }
};

export { authAPI };