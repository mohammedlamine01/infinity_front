'use client';

import { useCallback } from 'react';
import { useLoading } from '@/contexts/LoadingContext';

/**
 * Custom hook to wrap async operations with loading state
 * @param {string} defaultMessage - Default loading message
 * @returns {Object} - withLoading function and loading utilities
 */
export function useAsyncLoad(defaultMessage = 'Loading...') {
  const { startLoading, stopLoading, updateProgress, updateMessage } = useLoading();

  /**
   * Wraps an async function with loading state
   * @param {Function} asyncFn - The async function to execute
   * @param {string} message - Optional custom loading message
   * @returns {Promise} - Result of the async function
   */
  const withLoading = useCallback(
    async (asyncFn, message = defaultMessage) => {
      try {
        startLoading(message);
        const result = await asyncFn();
        return result;
      } catch (error) {
        console.error('Error in async operation:', error);
        throw error;
      } finally {
        stopLoading();
      }
    },
    [startLoading, stopLoading, defaultMessage]
  );

  /**
   * Wraps an async function with loading and progress tracking
   * @param {Function} asyncFn - The async function to execute
   * @param {Object} options - Options for loading behavior
   * @returns {Promise} - Result of the async function
   */
  const withLoadingAndProgress = useCallback(
    async (asyncFn, options = {}) => {
      const {
        message = defaultMessage,
        onProgress = null,
        progressSteps = [],
      } = options;

      try {
        startLoading(message);

        // If progress steps are provided, simulate progress
        if (progressSteps.length > 0) {
          for (let i = 0; i < progressSteps.length; i++) {
            updateMessage(progressSteps[i].message || message);
            updateProgress(progressSteps[i].progress || ((i + 1) / progressSteps.length) * 100);
            if (progressSteps[i].delay) {
              await new Promise((resolve) => setTimeout(resolve, progressSteps[i].delay));
            }
          }
        }

        const result = await asyncFn(updateProgress, updateMessage);
        
        // Complete progress
        updateProgress(100);
        
        return result;
      } catch (error) {
        console.error('Error in async operation:', error);
        throw error;
      } finally {
        // Small delay to show 100% completion
        await new Promise((resolve) => setTimeout(resolve, 300));
        stopLoading();
      }
    },
    [startLoading, stopLoading, updateProgress, updateMessage, defaultMessage]
  );

  return {
    withLoading,
    withLoadingAndProgress,
    startLoading,
    stopLoading,
    updateProgress,
    updateMessage,
  };
}
