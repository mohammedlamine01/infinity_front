# 🎯 Loading System - Complete Guide

## 📋 Table of Contents
1. [Overview](#overview)
2. [Components](#components)
3. [Usage Examples](#usage-examples)
4. [Best Practices](#best-practices)
5. [API Reference](#api-reference)

---

## 🌟 Overview

A comprehensive, production-ready loading system for Next.js/React applications with:
- ✅ Global loading state management
- ✅ Progress tracking
- ✅ Top loading bar (NProgress style)
- ✅ Full-page loading overlay
- ✅ Smooth animations & transitions
- ✅ Easy-to-use hooks
- ✅ TypeScript support ready

---

## 🧩 Components

### 1. LoadingContext
**Location:** `src/contexts/LoadingContext.jsx`

Global state management for loading operations.

```jsx
import { LoadingProvider, useLoading } from '@/contexts/LoadingContext';
```

### 2. LoadingPage
**Location:** `src/components/LoadingPage.jsx`

Full-page loading overlay with spinner, message, and progress bar.

**Features:**
- Centered spinner animation
- Custom loading messages
- Progress bar (0-100%)
- Smooth fade in/out transitions
- Backdrop blur effect

### 3. LoadingBar
**Location:** `src/components/LoadingBar.jsx`

Top progress bar (NProgress style) that appears at the top of the page.

**Features:**
- Automatic progress simulation
- Gradient animation
- Smooth transitions
- Auto-completes on stop

### 4. useAsyncLoad Hook
**Location:** `src/hooks/useAsyncLoad.js`

Custom hook for wrapping async operations with loading state.

---

## 🚀 Usage Examples

### Basic API Call

```jsx
'use client';

import { useEffect, useState } from 'react';
import { useAsyncLoad } from '@/hooks/useAsyncLoad';

export default function UserProfile() {
  const { withLoading } = useAsyncLoad('Loading user data...');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      await withLoading(async () => {
        const response = await fetch('/api/user');
        const data = await response.json();
        setUser(data);
      });
    };
    
    fetchUser();
  }, []);

  return <div>{user && <p>Welcome, {user.name}</p>}</div>;
}
```

### With Progress Tracking

```jsx
'use client';

import { useAsyncLoad } from '@/hooks/useAsyncLoad';

export default function DataLoader() {
  const { withLoadingAndProgress } = useAsyncLoad();

  const loadAllData = async () => {
    await withLoadingAndProgress(
      async (updateProgress, updateMessage) => {
        // Step 1
        updateMessage('Loading categories...');
        updateProgress(25);
        const categories = await fetch('/api/categories').then(r => r.json());
        
        // Step 2
        updateMessage('Loading products...');
        updateProgress(50);
        const products = await fetch('/api/products').then(r => r.json());
        
        // Step 3
        updateMessage('Processing data...');
        updateProgress(75);
        await processData(categories, products);
        
        // Complete
        updateProgress(100);
      },
      { message: 'Loading dashboard data...' }
    );
  };

  return <button onClick={loadAllData}>Load Data</button>;
}
```

### File Upload with Progress

```jsx
'use client';

import { useLoading } from '@/contexts/LoadingContext';

export default function FileUploader() {
  const { startLoading, stopLoading, updateProgress, updateMessage } = useLoading();

  const handleUpload = async (file) => {
    try {
      startLoading('Uploading file...');

      const formData = new FormData();
      formData.append('file', file);

      const xhr = new XMLHttpRequest();

      // Track upload progress
      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable) {
          const percent = (e.loaded / e.total) * 100;
          updateProgress(percent);
          updateMessage(`Uploading: ${Math.round(percent)}%`);
        }
      });

      const uploadPromise = new Promise((resolve, reject) => {
        xhr.onload = () => resolve(JSON.parse(xhr.responseText));
        xhr.onerror = () => reject(new Error('Upload failed'));
      });

      xhr.open('POST', '/api/upload');
      xhr.send(formData);

      await uploadPromise;
    } finally {
      stopLoading();
    }
  };

  return (
    <input type="file" onChange={(e) => handleUpload(e.target.files[0])} />
  );
}
```

### Multiple Parallel API Calls

```jsx
'use client';

import { useAsyncLoad } from '@/hooks/useAsyncLoad';

export default function Dashboard() {
  const { withLoadingAndProgress } = useAsyncLoad();

  const loadDashboard = async () => {
    await withLoadingAndProgress(
      async (updateProgress) => {
        const [users, products, orders] = await Promise.all([
          fetch('/api/users').then(r => r.json()).finally(() => updateProgress(33)),
          fetch('/api/products').then(r => r.json()).finally(() => updateProgress(66)),
          fetch('/api/orders').then(r => r.json()).finally(() => updateProgress(100)),
        ]);

        return { users, products, orders };
      },
      { message: 'Loading dashboard...' }
    );
  };

  return <button onClick={loadDashboard}>Refresh Dashboard</button>;
}
```

### Form Submission

```jsx
'use client';

import { useAsyncLoad } from '@/hooks/useAsyncLoad';

export default function ContactForm() {
  const { withLoading } = useAsyncLoad();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    await withLoading(async () => {
      const response = await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify(Object.fromEntries(formData)),
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) throw new Error('Submission failed');
      
      // Show success message
      alert('Form submitted successfully!');
    }, 'Submitting form...');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" required />
      <input name="email" type="email" placeholder="Email" required />
      <button type="submit">Submit</button>
    </form>
  );
}
```

### Page Navigation with Pre-loading

```jsx
'use client';

import { useRouter } from 'next/navigation';
import { useLoading } from '@/contexts/LoadingContext';

export default function NavigationButton() {
  const router = useRouter();
  const { startLoading, stopLoading } = useLoading();

  const navigateWithLoading = async (path) => {
    startLoading('Loading page...');
    
    // Optional: Pre-fetch data
    try {
      await fetch(`/api/page-data${path}`);
    } catch (error) {
      console.error('Pre-fetch failed:', error);
    }
    
    router.push(path);
    
    // Note: Stop loading in destination page's useEffect or after a delay
    setTimeout(stopLoading, 500);
  };

  return (
    <button onClick={() => navigateWithLoading('/products')}>
      Go to Products
    </button>
  );
}
```

---

## ✨ Best Practices

### 1. Always Use Try-Finally

```jsx
const { startLoading, stopLoading } = useLoading();

const fetchData = async () => {
  try {
    startLoading('Loading...');
    // Your async operation
  } finally {
    stopLoading(); // Always stop, even on error
  }
};
```

### 2. Use withLoading for Simplicity

```jsx
// Instead of manual start/stop
const { withLoading } = useAsyncLoad();

await withLoading(async () => {
  // Your async code
});
```

### 3. Provide Meaningful Messages

```jsx
// ❌ Bad
startLoading('Loading...');

// ✅ Good
startLoading('Fetching user profile...');
updateMessage('Processing payment...');
```

### 4. Update Progress Appropriately

```jsx
// For known steps
updateProgress(25);  // After step 1
updateProgress(50);  // After step 2
updateProgress(75);  // After step 3
updateProgress(100); // Complete

// For uploads, use actual progress
const percent = (loaded / total) * 100;
updateProgress(percent);
```

### 5. Handle Errors Gracefully

```jsx
const { withLoading } = useAsyncLoad();

try {
  await withLoading(async () => {
    // Operation
  });
} catch (error) {
  console.error('Operation failed:', error);
  // Show error toast/notification
}
```

### 6. Avoid Nested Loading States

```jsx
// ❌ Bad - nested loading
startLoading();
await operation1(); // This also starts loading
stopLoading();

// ✅ Good - single loading state
await withLoading(async () => {
  await operation1();
  await operation2();
});
```

---

## 📚 API Reference

### LoadingContext API

```jsx
const {
  isLoading,        // boolean - current loading state
  loadingMessage,   // string - current message
  progress,         // number - progress (0-100)
  startLoading,     // (message?: string) => void
  stopLoading,      // () => void
  updateProgress,   // (value: number) => void
  updateMessage,    // (message: string) => void
} = useLoading();
```

### useAsyncLoad Hook API

```jsx
const {
  withLoading,              // (asyncFn, message?) => Promise
  withLoadingAndProgress,   // (asyncFn, options?) => Promise
  startLoading,             // (message?: string) => void
  stopLoading,              // () => void
  updateProgress,           // (value: number) => void
  updateMessage,            // (message: string) => void
} = useAsyncLoad(defaultMessage?);
```

#### withLoading Options

```jsx
await withLoading(
  async () => {
    // Your async operation
  },
  'Custom loading message' // Optional
);
```

#### withLoadingAndProgress Options

```jsx
await withLoadingAndProgress(
  async (updateProgress, updateMessage) => {
    // Your async operation with progress updates
  },
  {
    message: 'Loading...', // Optional
    onProgress: (progress) => {}, // Optional callback
    progressSteps: [ // Optional predefined steps
      { progress: 25, message: 'Step 1...', delay: 100 },
      { progress: 50, message: 'Step 2...', delay: 100 },
    ],
  }
);
```

---

## 🎨 Customization

### Change Loading Animation

Edit `src/components/LoadingPage.jsx`:

```jsx
{/* Replace the spinner with your custom animation */}
<div className="h-16 w-16 rounded-full border-4 border-muted animate-spin border-t-primary"></div>
```

### Change Loading Bar Color

Edit `src/components/LoadingBar.jsx`:

```jsx
<div className="h-full bg-gradient-to-r from-primary via-primary/80 to-primary">
  {/* Change gradient colors */}
</div>
```

### Add Loading Sounds (Optional)

```jsx
const playLoadingSound = () => {
  const audio = new Audio('/sounds/loading.mp3');
  audio.play();
};

startLoading('Loading...');
playLoadingSound();
```

---

## 🔧 Troubleshooting

### Loading doesn't appear
- Ensure `LoadingProvider` wraps your app in `layout.jsx`
- Check that `LoadingPage` and `LoadingBar` are rendered in layout

### Loading doesn't stop
- Always use try-finally blocks
- Check for errors in async operations
- Use `withLoading` for automatic cleanup

### Progress not updating
- Call `updateProgress()` with values 0-100
- Ensure you're using `withLoadingAndProgress` if you need progress

---

## 📝 Notes

- The loading system is client-side only (`'use client'`)
- Works seamlessly with Next.js App Router
- Compatible with all modern browsers
- Fully responsive and accessible
- No external dependencies (uses native React & Tailwind)

---

## 🎉 Complete Setup Checklist

- ✅ `LoadingContext.jsx` created
- ✅ `LoadingPage.jsx` component created
- ✅ `LoadingBar.jsx` component created
- ✅ `useAsyncLoad.js` hook created
- ✅ `LoadingProvider` added to `layout.jsx`
- ✅ `LoadingPage` and `LoadingBar` rendered in layout
- ✅ `AuthContext` updated to use loading system
- ✅ Ready to use in any component!

---

**Enjoy your new loading system! 🚀**
