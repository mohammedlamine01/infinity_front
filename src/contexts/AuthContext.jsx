'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { isAuthenticated, getCurrentUser, logoutUser as logoutUserUtil, fetchCurrentUser } from '@/utils/auth';
import { useLoading } from '@/contexts/LoadingContext';
import { setRoleCookie, setUserIdCookie, setUserNameCookie, setTokenCookie, setUserCookie, getTokenCookie } from '@/utils/cookies';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const { startLoading, stopLoading } = useLoading();

  // Check auth status on mount with initial loading
  useEffect(() => {
    initializeApp();
  }, []);

  // Initialize app - fetch user data from API if token exists
  const initializeApp = async () => {
    try {
      setIsInitialLoading(true);
      
      // Simulate realistic app initialization
      await new Promise((resolve) => setTimeout(resolve, 800));
      
      const authStatus = isAuthenticated();
      let currentUser = getCurrentUser();
      
      // If token exists, try to fetch fresh user data from API
      if (authStatus && currentUser?.id) {
        try {
          currentUser = await fetchCurrentUser();
        } catch (error) {
          // If fetch fails, use cached user data
          console.log('Failed to fetch fresh user data, using cached:', error.message);
          currentUser = getCurrentUser();
        }
      }
      
      setIsAuth(authStatus);
      setUser(currentUser);
      
      // ✅ Set cookies if user is authenticated
      if (authStatus && currentUser) {
        const token = getTokenCookie();
        if (token) setTokenCookie(token);
        
        // Set user data cookie
        setUserCookie(currentUser);
        
        // Set individual field cookies
        if (currentUser.role) setRoleCookie(currentUser.role);
        if (currentUser.id) setUserIdCookie(currentUser.id);
        if (currentUser.name) setUserNameCookie(currentUser.name);
        else if (currentUser.prenom && currentUser.nom) {
          setUserNameCookie(`${currentUser.prenom} ${currentUser.nom}`);
        }
      }
      
      // Small delay for smooth transition
      await new Promise((resolve) => setTimeout(resolve, 200));
    } catch (error) {
      console.error('App initialization error:', error);
      setIsAuth(false);
      setUser(null);
    } finally {
      setLoading(false);
      setIsInitialLoading(false);
    }
  };

  const checkAuth = async () => {
    try {
      startLoading('Checking authentication...');
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      const authStatus = isAuthenticated();
      let currentUser = getCurrentUser();
      
      // Refresh user data from API
      if (authStatus) {
        try {
          currentUser = await fetchCurrentUser();
        } catch (error) {
          currentUser = getCurrentUser();
        }
      }
      
      setIsAuth(authStatus);
      setUser(currentUser);
      setLoading(false);
    } finally {
      stopLoading();
    }
  };

  const login = (userData, token) => {
    if (token) setTokenCookie(token);
    if (userData) {
      setUserCookie(userData);
      if (userData.role) setRoleCookie(userData.role);
      if (userData.id) setUserIdCookie(userData.id);
      if (userData.name) setUserNameCookie(userData.name);
      else if (userData.prenom && userData.nom) {
        setUserNameCookie(`${userData.prenom} ${userData.nom}`);
      }
    }

    setIsAuth(true);
    setUser(userData);
  };

  const logout = async () => {
    await logoutUserUtil();
    setIsAuth(false);
    setUser(null);
  };

  const value = {
    isAuth,
    user,
    loading,
    isInitialLoading,
    login,
    logout,
    checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
