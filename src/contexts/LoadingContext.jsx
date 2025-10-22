'use client';

import { createContext, useContext, useState, useCallback } from 'react';

const LoadingContext = createContext();

export function LoadingProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [progress, setProgress] = useState(0);

  // Start loading with optional message
  const startLoading = useCallback((message = 'Loading...') => {
    setIsLoading(true);
    setLoadingMessage(message);
    setProgress(0);
  }, []);

  // Stop loading
  const stopLoading = useCallback(() => {
    setIsLoading(false);
    setLoadingMessage('');
    setProgress(0);
  }, []);

  // Update progress (0-100)
  const updateProgress = useCallback((value) => {
    setProgress(Math.min(100, Math.max(0, value)));
  }, []);

  // Update loading message
  const updateMessage = useCallback((message) => {
    setLoadingMessage(message);
  }, []);

  const value = {
    isLoading,
    loadingMessage,
    progress,
    startLoading,
    stopLoading,
    updateProgress,
    updateMessage,
  };

  return (
    <LoadingContext.Provider value={value}>
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
}
