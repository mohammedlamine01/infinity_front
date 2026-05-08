// ==================== COOKIE UTILITIES ====================

/**
 * Set a cookie with optional expiration time
 * @param {string} name - Cookie name
 * @param {string} value - Cookie value
 * @param {number} daysToExpire - Days until cookie expires (default: 7)
 */
export const setCookie = (name, value, daysToExpire = 7) => {
  if (typeof document === 'undefined') return;
  
  try {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + daysToExpire);
    
    const cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; expires=${expirationDate.toUTCString()}; path=/; SameSite=Strict`;
    document.cookie = cookieString;
  } catch (error) {
    console.error('Error setting cookie:', error);
  }
};

/**
 * Get a cookie value by name
 * @param {string} name - Cookie name
 * @returns {string|null} Cookie value or null if not found
 */
export const getCookie = (name) => {
  if (typeof document === 'undefined') return null;
  
  try {
    const nameEQ = encodeURIComponent(name) + '=';
    const cookies = document.cookie.split(';');
    
    for (let cookie of cookies) {
      cookie = cookie.trim();
      if (cookie.indexOf(nameEQ) === 0) {
        return decodeURIComponent(cookie.substring(nameEQ.length));
      }
    }
    return null;
  } catch (error) {
    console.error('Error getting cookie:', error);
    return null;
  }
};

/**
 * Delete a cookie
 * @param {string} name - Cookie name
 */
export const deleteCookie = (name) => {
  if (typeof document === 'undefined') return;
  
  try {
    setCookie(name, '', -1);
  } catch (error) {
    console.error('Error deleting cookie:', error);
  }
};

/**
 * Save authentication token to cookie
 * @param {string} token - JWT token
 */
export const setTokenCookie = (token) => {
  setCookie('authToken', token, 30); // 30 days expiration
};

/**
 * Get authentication token from cookie
 * @returns {string|null} Auth token or null
 */
export const getTokenCookie = () => {
  return getCookie('authToken');
};

/**
 * Save user data to cookie (as JSON string)
 * @param {object} userData - User data object
 */
export const setUserCookie = (userData) => {
  try {
    const userJson = JSON.stringify(userData);
    setCookie('userData', userJson, 30); // 30 days expiration
  } catch (error) {
    console.error('Error saving user to cookie:', error);
  }
};

/**
 * Get user data from cookie
 * @returns {object|null} User object or null
 */
export const getUserCookie = () => {
  try {
    const userJson = getCookie('userData');
    return userJson ? JSON.parse(userJson) : null;
  } catch (error) {
    console.error('Error getting user from cookie:', error);
    return null;
  }
};

/**
 * Get user role from cookie
 * @returns {string|null} User role or null
 */
export const getRoleCookie = () => {
  return getCookie('userRole');
};

/**
 * Save user role to cookie
 * @param {string} role - User role (admin, member, visiteur)
 */
export const setRoleCookie = (role) => {
  setCookie('userRole', String(role || '').trim().toLowerCase(), 30); // 30 days expiration
};

/**
 * Check if user is admin from cookie
 * @returns {boolean} True if user is admin
 */
export const isAdminFromCookie = () => {
  const role = (getRoleCookie() || '').trim().toLowerCase();
  return role === 'admin';
};

/**
 * Save user ID to cookie
 * @param {number|string} userId - User ID
 */
export const setUserIdCookie = (userId) => {
  setCookie('userId', String(userId), 30);
};

/**
 * Get user ID from cookie
 * @returns {string|null} User ID or null
 */
export const getUserIdCookie = () => {
  return getCookie('userId');
};

/**
 * Save user name to cookie
 * @param {string} userName - User name
 */
export const setUserNameCookie = (userName) => {
  setCookie('userName', userName, 30);
};

/**
 * Get user name from cookie
 * @returns {string|null} User name or null
 */
export const getUserNameCookie = () => {
  return getCookie('userName');
};

/**
 * Clear all auth-related cookies
 */
export const clearAuthCookies = () => {
  deleteCookie('authToken');      // Clear token
  deleteCookie('userData');       // Clear user data
  deleteCookie('userRole');       // Clear user role
  deleteCookie('userId');         // Clear user ID
  deleteCookie('userName');       // Clear user name
};
