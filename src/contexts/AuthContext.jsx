'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { isAuthenticated, getCurrentUser, logoutUser as logoutUserUtil } from '@/utils/auth';
import { useLoading } from '@/contexts/LoadingContext';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isInitialLoading, setIsInitialLoading] = useState(true); // New: initial app load state
  const { startLoading, stopLoading } = useLoading();

  // Check auth status on mount with initial loading
  useEffect(() => {
    initializeApp();
  }, []);

  // Initialize app - simulates fetching user data and config on first load
  const initializeApp = async () => {
    try {
      setIsInitialLoading(true);
      
      // Simulate realistic app initialization (fetch user, config, etc.)
      await new Promise((resolve) => setTimeout(resolve, 800));
      
      const authStatus = isAuthenticated();
      const currentUser = getCurrentUser();
      
      setIsAuth(authStatus);
      setUser(currentUser);
      
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
      const currentUser = getCurrentUser();
      setIsAuth(authStatus);
      setUser(currentUser);
      setLoading(false);
    } finally {
      stopLoading();
    }
  };

  const login = (userData, token) => {
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
    isInitialLoading, // Expose initial loading state
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
