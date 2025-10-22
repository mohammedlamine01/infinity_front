import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request interceptor - add JWT token to requests
api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handle token refresh and errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If token expired and we haven't retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Try to refresh token
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
          const { data } = await axios.post(`${API_URL}/auth/refresh`, {
            token: refreshToken,
          });
          
          localStorage.setItem('token', data.token);
          originalRequest.headers.Authorization = `Bearer ${data.token}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        // Refresh failed - logout
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// ============================================
// AUTH API
// ============================================

export const authAPI = {
  // Register new user
  register: (userData) => api.post('/auth/register', userData),
  
  // Login
  login: (credentials) => api.post('/auth/login', credentials),
  
  // Logout
  logout: () => api.post('/auth/logout'),
  
  // Get current user
  getUser: () => api.get('/auth/user'),
  
  // Update user profile
  updateUser: (id, userData) => api.put(`/auth/user/${id}`, userData),
  
  // Delete user
  deleteUser: (id) => api.delete(`/auth/users/${id}`),
  
  // Get pending users (admin only)
  getPendingUsers: () => api.get('/auth/users/pending'),
  
  // Validate user (admin only)
  validateUser: (id) => api.put(`/auth/users/validate/${id}`),
};

// ============================================
// DEPARTMENTS API
// ============================================

export const departmentsAPI = {
  // Get all departments
  getAll: () => api.get('/departments'),
  
  // Get single department
  getById: (id) => api.get(`/departments/${id}`),
  
  // Create department (admin only)
  create: (data) => api.post('/auth/departments', data),
  
  // Update department (admin only)
  update: (id, data) => api.put(`/auth/departments/${id}`, data),
  
  // Delete department (admin only)
  delete: (id) => api.delete(`/auth/departments/${id}`),
  
  // Get specialites by department
  getSpecialites: (id) => api.get(`/departments/${id}/specialites`),
};

// ============================================
// SPECIALITES API
// ============================================

export const specialitesAPI = {
  // Get all specialites
  getAll: () => api.get('/specialites'),
  
  // Get single specialite
  getById: (id) => api.get(`/specialites/${id}`),
  
  // Create specialite (admin only)
  create: (data) => api.post('/auth/specialites', data),
  
  // Update specialite (admin only)
  update: (id, data) => api.put(`/auth/specialites/${id}`, data),
  
  // Delete specialite (admin only)
  delete: (id) => api.delete(`/auth/specialites/${id}`),
  
  // Get users by specialite
  getUsers: (id) => api.get(`/specialites/${id}/users`),
};

// ============================================
// EVENTS API
// ============================================

export const eventsAPI = {
  // Get all events
  getAll: () => api.get('/events'),
  
  // Get single event
  getById: (id) => api.get(`/events/${id}`),
  
  // Create event (admin only)
  create: (data) => {
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      if (data[key] !== null && data[key] !== undefined) {
        formData.append(key, data[key]);
      }
    });
    return api.post('/auth/events', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  
  // Update event (admin only)
  update: (id, data) => {
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      if (data[key] !== null && data[key] !== undefined) {
        formData.append(key, data[key]);
      }
    });
    return api.put(`/auth/events/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  
  // Delete event (admin only)
  delete: (id) => api.delete(`/auth/events/${id}`),
};

// ============================================
// LINKS API
// ============================================

export const linksAPI = {
  // Get user links
  getByUser: (userId) => api.get(`/links/${userId}`),
  
  // Add link (requires auth)
  create: (data) => api.post('/auth/links', data),
  
  // Update link (requires auth)
  update: (linkId, data) => api.put(`/auth/links/${linkId}`, data),
  
  // Delete link (requires auth)
  delete: (linkId) => api.delete(`/auth/links/${linkId}`),
};

// ============================================
// USERS API
// ============================================

export const usersAPI = {
  // Get all users
  getAll: () => api.get('/auth/users'),
  
  // Get user by ID
  getById: (id) => api.get(`/auth/users/${id}`),
  
  // Get pending users (admin only)
  getPending: () => api.get('/auth/users/pending'),
  
  // Validate user (admin only)
  validate: (id) => api.put(`/auth/users/validate/${id}`),
  
  // Delete user (admin only)
  delete: (id) => api.delete(`/auth/users/${id}`),
};

// ============================================
// IMAGES API
// ============================================

export const imagesAPI = {
  // Upload image
  upload: (file) => {
    const formData = new FormData();
    formData.append('image', file);
    return api.post('/images', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  
  // Get image URL
  getUrl: (imagePath) => {
    if (!imagePath) return null;
    // If it's already a full URL, return it
    if (imagePath.startsWith('http')) return imagePath;
    // Otherwise, construct the URL
    return `${API_URL.replace('/api', '')}/storage/${imagePath}`;
  },
};

export default api;
