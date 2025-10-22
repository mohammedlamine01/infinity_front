// ============================================
// LOADING SYSTEM - USAGE EXAMPLES
// ============================================

/*
 * This file demonstrates how to use the loading system in various scenarios
 * including API calls, file uploads, and data fetching operations.
 */

// ============================================
// 1. BASIC USAGE WITH API CALLS
// ============================================

import { useLoading } from '@/contexts/LoadingContext';
import { useAsyncLoad } from '@/hooks/useAsyncLoad';

// Example Component - Fetch User Data
export function UserProfile() {
  const { withLoading } = useAsyncLoad('Loading user data...');
  const [userData, setUserData] = useState(null);

  const fetchUserData = async () => {
    await withLoading(async () => {
      const response = await fetch('/api/user');
      const data = await response.json();
      setUserData(data);
    });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return <div>{/* Your component JSX */}</div>;
}

// ============================================
// 2. USAGE WITH PROGRESS TRACKING
// ============================================

export function ProductList() {
  const { withLoadingAndProgress } = useAsyncLoad();
  const [products, setProducts] = useState([]);

  const loadProducts = async () => {
    await withLoadingAndProgress(
      async (updateProgress, updateMessage) => {
        // Step 1: Fetch categories
        updateMessage('Loading categories...');
        updateProgress(25);
        const categories = await fetch('/api/categories').then(r => r.json());
        
        // Step 2: Fetch products
        updateMessage('Loading products...');
        updateProgress(50);
        const products = await fetch('/api/products').then(r => r.json());
        
        // Step 3: Process data
        updateMessage('Processing data...');
        updateProgress(75);
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Step 4: Complete
        updateProgress(100);
        setProducts(products);
      },
      {
        message: 'Loading products...',
      }
    );
  };

  return <div>{/* Your component JSX */}</div>;
}

// ============================================
// 3. FILE UPLOAD WITH PROGRESS
// ============================================

export function FileUploader() {
  const { startLoading, stopLoading, updateProgress, updateMessage } = useLoading();

  const handleFileUpload = async (file) => {
    try {
      startLoading('Uploading file...');

      const formData = new FormData();
      formData.append('file', file);

      const xhr = new XMLHttpRequest();

      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable) {
          const percentComplete = (e.loaded / e.total) * 100;
          updateProgress(percentComplete);
          updateMessage(`Uploading: ${Math.round(percentComplete)}%`);
        }
      });

      const uploadPromise = new Promise((resolve, reject) => {
        xhr.onload = () => {
          if (xhr.status === 200) {
            resolve(JSON.parse(xhr.responseText));
          } else {
            reject(new Error('Upload failed'));
          }
        };
        xhr.onerror = () => reject(new Error('Upload error'));
      });

      xhr.open('POST', '/api/upload');
      xhr.send(formData);

      await uploadPromise;
      updateMessage('Upload complete!');
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      stopLoading();
    }
  };

  return <div>{/* Your uploader component */}</div>;
}

// ============================================
// 4. FIREBASE/FIRESTORE INTEGRATION
// ============================================

export function FirebaseDataLoader() {
  const { withLoading } = useAsyncLoad('Loading from Firebase...');
  const [data, setData] = useState([]);

  const loadFirebaseData = async () => {
    await withLoading(async () => {
      // Example with Firestore
      const snapshot = await getDocs(collection(db, 'products'));
      const items = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setData(items);
    }, 'Fetching data from Firebase...');
  };

  return <div>{/* Your component */}</div>;
}

// ============================================
// 5. MULTIPLE PARALLEL API CALLS
// ============================================

export function DashboardData() {
  const { withLoadingAndProgress } = useAsyncLoad();

  const loadDashboardData = async () => {
    await withLoadingAndProgress(
      async (updateProgress, updateMessage) => {
        updateMessage('Loading dashboard data...');
        
        // Fetch multiple endpoints in parallel
        const [users, products, orders, analytics] = await Promise.all([
          fetch('/api/users').then(r => r.json()).finally(() => updateProgress(25)),
          fetch('/api/products').then(r => r.json()).finally(() => updateProgress(50)),
          fetch('/api/orders').then(r => r.json()).finally(() => updateProgress(75)),
          fetch('/api/analytics').then(r => r.json()).finally(() => updateProgress(100)),
        ]);

        // Process and set data
        return { users, products, orders, analytics };
      },
      { message: 'Loading dashboard...' }
    );
  };

  return <div>{/* Dashboard JSX */}</div>;
}

// ============================================
// 6. FORM SUBMISSION WITH LOADING
// ============================================

export function ContactForm() {
  const { withLoading } = useAsyncLoad();

  const handleSubmit = async (formData) => {
    await withLoading(async () => {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Submission failed');

      const result = await response.json();
      // Handle success
      return result;
    }, 'Submitting form...');
  };

  return <form onSubmit={handleSubmit}>{/* Form fields */}</form>;
}

// ============================================
// 7. PAGE NAVIGATION WITH LOADING
// ============================================

import { useRouter } from 'next/navigation';

export function NavigationButton() {
  const router = useRouter();
  const { startLoading, stopLoading } = useLoading();

  const handleNavigation = async (path) => {
    startLoading('Loading page...');
    // Simulate data pre-fetch
    await fetch(`/api/page-data${path}`);
    router.push(path);
    // Note: You may want to stop loading in the destination page's useEffect
    setTimeout(stopLoading, 500);
  };

  return <button onClick={() => handleNavigation('/products')}>Go to Products</button>;
}

// ============================================
// 8. MANUAL CONTROL EXAMPLE
// ============================================

export function ManualLoadingControl() {
  const { startLoading, stopLoading, updateProgress, updateMessage } = useLoading();

  const complexOperation = async () => {
    startLoading('Starting operation...');

    try {
      // Step 1
      updateMessage('Processing step 1...');
      updateProgress(20);
      await someAsyncTask1();

      // Step 2
      updateMessage('Processing step 2...');
      updateProgress(40);
      await someAsyncTask2();

      // Step 3
      updateMessage('Processing step 3...');
      updateProgress(60);
      await someAsyncTask3();

      // Step 4
      updateMessage('Finalizing...');
      updateProgress(80);
      await someAsyncTask4();

      // Complete
      updateProgress(100);
      updateMessage('Complete!');
    } catch (error) {
      console.error('Operation failed:', error);
    } finally {
      // Delay to show completion
      setTimeout(stopLoading, 500);
    }
  };

  return <button onClick={complexOperation}>Start Operation</button>;
}

// ============================================
// 9. RETRY LOGIC WITH LOADING
// ============================================

export function RetryableRequest() {
  const { withLoading } = useAsyncLoad();

  const fetchWithRetry = async (url, maxRetries = 3) => {
    await withLoading(async () => {
      let lastError;
      
      for (let i = 0; i < maxRetries; i++) {
        try {
          const response = await fetch(url);
          if (!response.ok) throw new Error('Request failed');
          return await response.json();
        } catch (error) {
          lastError = error;
          if (i < maxRetries - 1) {
            await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
          }
        }
      }
      
      throw lastError;
    }, 'Fetching data (with retry)...');
  };

  return <div>{/* Component JSX */}</div>;
}

// ============================================
// 10. CACHE WITH LOADING
// ============================================

const cache = new Map();

export function CachedDataFetcher() {
  const { withLoading } = useAsyncLoad();

  const fetchWithCache = async (key, fetcher) => {
    // Check cache first (no loading needed)
    if (cache.has(key)) {
      return cache.get(key);
    }

    // Fetch with loading
    const data = await withLoading(async () => {
      const result = await fetcher();
      cache.set(key, result);
      return result;
    }, 'Loading data...');

    return data;
  };

  return <div>{/* Component JSX */}</div>;
}
