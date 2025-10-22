/**
 * INITIAL LOADING SCREEN - PRODUCTION EXAMPLES
 * 
 * Real-world examples of integrating initial loading with API calls
 */

// ============================================
// EXAMPLE 1: Basic Auth Check on App Load
// ============================================

import { useState, useEffect } from 'react';

export function useAppInitialization() {
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [appConfig, setAppConfig] = useState(null);

  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    try {
      setIsInitialLoading(true);

      // Check authentication
      const authResponse = await fetch('/api/auth/me');
      const authData = await authResponse.json();

      if (authData.authenticated) {
        setUser(authData.user);
      }

      // Load app configuration
      const configResponse = await fetch('/api/config');
      const config = await configResponse.json();
      setAppConfig(config);

      // Small delay for smooth transition
      await new Promise(resolve => setTimeout(resolve, 200));

    } catch (error) {
      console.error('App initialization failed:', error);
      // Continue anyway - don't block app
    } finally {
      setIsInitialLoading(false);
    }
  };

  return { isInitialLoading, user, appConfig };
}

// ============================================
// EXAMPLE 2: Firebase/Firestore Initial Load
// ============================================

import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

export function useFirebaseInitialization() {
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const initFirebase = async () => {
      try {
        setIsInitialLoading(true);

        const app = initializeApp({
          // Your Firebase config
        });

        const auth = getAuth(app);
        const db = getFirestore(app);

        // Wait for auth state
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
          if (user) {
            // Fetch additional user data from Firestore
            const userDoc = await getDoc(doc(db, 'users', user.uid));
            setCurrentUser({
              ...user,
              ...userDoc.data(),
            });
          }

          // Small delay for smooth transition
          await new Promise(resolve => setTimeout(resolve, 300));
          setIsInitialLoading(false);
        });

        return () => unsubscribe();
      } catch (error) {
        console.error('Firebase init error:', error);
        setIsInitialLoading(false);
      }
    };

    initFirebase();
  }, []);

  return { isInitialLoading, currentUser };
}

// ============================================
// EXAMPLE 3: GraphQL with Apollo Client
// ============================================

import { ApolloClient, InMemoryCache, useQuery, gql } from '@apollo/client';

const INITIAL_DATA_QUERY = gql`
  query InitialData {
    currentUser {
      id
      name
      email
      avatar
    }
    appSettings {
      theme
      language
      features
    }
  }
`;

export function useGraphQLInitialization() {
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  const { data, loading, error } = useQuery(INITIAL_DATA_QUERY, {
    onCompleted: async () => {
      // Small delay for smooth transition
      await new Promise(resolve => setTimeout(resolve, 200));
      setIsInitialLoading(false);
    },
    onError: (error) => {
      console.error('GraphQL init error:', error);
      setIsInitialLoading(false);
    },
  });

  return {
    isInitialLoading: isInitialLoading || loading,
    currentUser: data?.currentUser,
    appSettings: data?.appSettings,
    error,
  };
}

// ============================================
// EXAMPLE 4: Multiple API Endpoints in Parallel
// ============================================

export function useMultiSourceInitialization() {
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [initialData, setInitialData] = useState({});

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setIsInitialLoading(true);

        // Fetch multiple endpoints in parallel
        const [
          authResponse,
          userResponse,
          settingsResponse,
          categoriesResponse,
        ] = await Promise.all([
          fetch('/api/auth/check'),
          fetch('/api/user/profile'),
          fetch('/api/settings'),
          fetch('/api/categories'),
        ]);

        const [auth, user, settings, categories] = await Promise.all([
          authResponse.json(),
          userResponse.json(),
          settingsResponse.json(),
          categoriesResponse.json(),
        ]);

        setInitialData({ auth, user, settings, categories });

        // Smooth transition delay
        await new Promise(resolve => setTimeout(resolve, 200));

      } catch (error) {
        console.error('Initialization error:', error);
      } finally {
        setIsInitialLoading(false);
      }
    };

    loadInitialData();
  }, []);

  return { isInitialLoading, ...initialData };
}

// ============================================
// EXAMPLE 5: With Error Handling and Retry
// ============================================

export function useRobustInitialization() {
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [initError, setInitError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const initWithRetry = async () => {
      try {
        setIsInitialLoading(true);
        setInitError(null);

        // Try to initialize
        const response = await fetch('/api/initialize', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
          throw new Error('Initialization failed');
        }

        const data = await response.json();
        // Handle success...

        await new Promise(resolve => setTimeout(resolve, 200));

      } catch (error) {
        console.error('Init error:', error);
        setInitError(error);

        // Retry up to 3 times
        if (retryCount < 3) {
          console.log(`Retrying... (${retryCount + 1}/3)`);
          await new Promise(resolve => setTimeout(resolve, 1000));
          setRetryCount(prev => prev + 1);
          return; // Try again
        }

        // Max retries reached - continue anyway
        console.error('Max retries reached');
      } finally {
        setIsInitialLoading(false);
      }
    };

    initWithRetry();
  }, [retryCount]);

  return { isInitialLoading, initError, retry: () => setRetryCount(0) };
}

// ============================================
// EXAMPLE 6: Progressive Loading with Updates
// ============================================

export function useProgressiveInitialization() {
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingMessage, setLoadingMessage] = useState('');

  useEffect(() => {
    const progressiveLoad = async () => {
      try {
        setIsInitialLoading(true);

        // Step 1: Auth check
        setLoadingMessage('Checking authentication...');
        setLoadingProgress(25);
        await fetch('/api/auth/check');
        await new Promise(resolve => setTimeout(resolve, 300));

        // Step 2: User data
        setLoadingMessage('Loading your profile...');
        setLoadingProgress(50);
        await fetch('/api/user/profile');
        await new Promise(resolve => setTimeout(resolve, 300));

        // Step 3: App settings
        setLoadingMessage('Loading settings...');
        setLoadingProgress(75);
        await fetch('/api/settings');
        await new Promise(resolve => setTimeout(resolve, 300));

        // Step 4: Complete
        setLoadingMessage('Ready!');
        setLoadingProgress(100);
        await new Promise(resolve => setTimeout(resolve, 200));

      } catch (error) {
        console.error('Loading error:', error);
      } finally {
        setIsInitialLoading(false);
      }
    };

    progressiveLoad();
  }, []);

  return { isInitialLoading, loadingProgress, loadingMessage };
}

// ============================================
// EXAMPLE 7: Conditional Initial Loading
// ============================================

export function useConditionalInitialization() {
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [needsOnboarding, setNeedsOnboarding] = useState(false);

  useEffect(() => {
    const checkAndLoad = async () => {
      try {
        setIsInitialLoading(true);

        // Check if user needs onboarding
        const onboardingResponse = await fetch('/api/onboarding/status');
        const onboardingData = await onboardingResponse.json();

        if (onboardingData.completed) {
          // Load full app data
          await fetch('/api/initialize/full');
        } else {
          // Just load minimal data for onboarding
          await fetch('/api/initialize/minimal');
          setNeedsOnboarding(true);
        }

        await new Promise(resolve => setTimeout(resolve, 200));

      } catch (error) {
        console.error('Init error:', error);
      } finally {
        setIsInitialLoading(false);
      }
    };

    checkAndLoad();
  }, []);

  return { isInitialLoading, needsOnboarding };
}

// ============================================
// EXAMPLE 8: With localStorage Cache
// ============================================

export function useCachedInitialization() {
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    const loadWithCache = async () => {
      try {
        setIsInitialLoading(true);

        // Check cache first
        const cached = localStorage.getItem('appInitData');
        if (cached) {
          const cachedData = JSON.parse(cached);
          
          // Check if cache is fresh (< 5 minutes old)
          const cacheAge = Date.now() - cachedData.timestamp;
          if (cacheAge < 5 * 60 * 1000) {
            console.log('Using cached data');
            setData(cachedData.data);
            setIsInitialLoading(false);
            return;
          }
        }

        // Fetch fresh data
        const response = await fetch('/api/initialize');
        const freshData = await response.json();

        // Cache for next time
        localStorage.setItem('appInitData', JSON.stringify({
          data: freshData,
          timestamp: Date.now(),
        }));

        setData(freshData);
        await new Promise(resolve => setTimeout(resolve, 200));

      } catch (error) {
        console.error('Init error:', error);
      } finally {
        setIsInitialLoading(false);
      }
    };

    loadWithCache();
  }, []);

  return { isInitialLoading, data };
}

// ============================================
// EXAMPLE 9: With WebSocket Connection
// ============================================

export function useWebSocketInitialization() {
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [wsConnected, setWsConnected] = useState(false);

  useEffect(() => {
    const initWithWebSocket = async () => {
      try {
        setIsInitialLoading(true);

        // Initial HTTP request
        const response = await fetch('/api/auth/check');
        const authData = await response.json();

        if (authData.authenticated) {
          // Establish WebSocket connection
          const ws = new WebSocket('wss://your-server.com/ws');

          ws.onopen = async () => {
            console.log('WebSocket connected');
            setWsConnected(true);
            
            // Small delay for smooth transition
            await new Promise(resolve => setTimeout(resolve, 200));
            setIsInitialLoading(false);
          };

          ws.onerror = (error) => {
            console.error('WebSocket error:', error);
            setIsInitialLoading(false); // Continue without WebSocket
          };
        } else {
          setIsInitialLoading(false);
        }

      } catch (error) {
        console.error('Init error:', error);
        setIsInitialLoading(false);
      }
    };

    initWithWebSocket();
  }, []);

  return { isInitialLoading, wsConnected };
}

// ============================================
// EXAMPLE 10: Complete Production Example
// ============================================

export function useProductionInitialization() {
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [appState, setAppState] = useState({
    user: null,
    config: null,
    features: [],
    error: null,
  });

  useEffect(() => {
    const productionInit = async () => {
      const startTime = Date.now();

      try {
        setIsInitialLoading(true);

        // Parallel data fetching
        const [authResult, configResult, featuresResult] = await Promise.allSettled([
          fetch('/api/auth/me').then(r => r.json()),
          fetch('/api/config').then(r => r.json()),
          fetch('/api/features').then(r => r.json()),
        ]);

        // Handle results
        const newState = {
          user: authResult.status === 'fulfilled' ? authResult.value : null,
          config: configResult.status === 'fulfilled' ? configResult.value : null,
          features: featuresResult.status === 'fulfilled' ? featuresResult.value : [],
          error: null,
        };

        setAppState(newState);

        // Ensure minimum loading time for smooth UX (at least 500ms)
        const elapsedTime = Date.now() - startTime;
        const minLoadTime = 500;
        if (elapsedTime < minLoadTime) {
          await new Promise(resolve => setTimeout(resolve, minLoadTime - elapsedTime));
        }

        // Small delay for fade transition
        await new Promise(resolve => setTimeout(resolve, 200));

      } catch (error) {
        console.error('Critical initialization error:', error);
        setAppState(prev => ({ ...prev, error }));
      } finally {
        setIsInitialLoading(false);
      }
    };

    productionInit();
  }, []);

  return { isInitialLoading, ...appState };
}
