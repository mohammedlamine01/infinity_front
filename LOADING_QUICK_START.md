# 🚀 Loading System - Quick Start

## ✅ Installation Complete!

Your loading system is now fully integrated into your React/Next.js app!

---

## 🎯 Quick Usage

### 1. Basic Usage (Recommended)

```jsx
'use client';

import { useAsyncLoad } from '@/hooks/useAsyncLoad';

export default function MyComponent() {
  const { withLoading } = useAsyncLoad('Loading...');

  const fetchData = async () => {
    await withLoading(async () => {
      const response = await fetch('/api/data');
      const data = await response.json();
      // Process data...
    });
  };

  return <button onClick={fetchData}>Load Data</button>;
}
```

### 2. With Progress Bar

```jsx
'use client';

import { useAsyncLoad } from '@/hooks/useAsyncLoad';

export default function MyComponent() {
  const { withLoadingAndProgress } = useAsyncLoad();

  const loadData = async () => {
    await withLoadingAndProgress(
      async (updateProgress, updateMessage) => {
        updateMessage('Loading categories...');
        updateProgress(33);
        await fetch('/api/categories');

        updateMessage('Loading products...');
        updateProgress(66);
        await fetch('/api/products');

        updateMessage('Complete!');
        updateProgress(100);
      },
      { message: 'Loading data...' }
    );
  };

  return <button onClick={loadData}>Load All</button>;
}
```

### 3. Manual Control

```jsx
'use client';

import { useLoading } from '@/contexts/LoadingContext';

export default function MyComponent() {
  const { startLoading, stopLoading, updateProgress, updateMessage } = useLoading();

  const customOperation = async () => {
    try {
      startLoading('Processing...');
      
      // Your operations
      updateProgress(50);
      updateMessage('Halfway there...');
      
      // More operations
      updateProgress(100);
    } finally {
      stopLoading();
    }
  };

  return <button onClick={customOperation}>Start</button>;
}
```

---

## 🧪 Test It Out

Visit the demo page to see all features in action:

```
http://localhost:3000/loading-demo
```

---

## 📁 Files Created

✅ `src/contexts/LoadingContext.jsx` - Global loading state
✅ `src/components/LoadingPage.jsx` - Full-page loading overlay
✅ `src/components/LoadingBar.jsx` - Top progress bar
✅ `src/hooks/useAsyncLoad.js` - Helper hook
✅ `src/app/loading-demo/page.jsx` - Demo page
✅ `src/examples/LOADING_USAGE_EXAMPLES.js` - Code examples
✅ `LOADING_SYSTEM_GUIDE.md` - Complete documentation

---

## 🎨 What You Get

### Full-Page Loading Overlay
- ✨ Centered spinner animation
- 💬 Custom messages
- 📊 Progress bar (0-100%)
- 🎭 Smooth fade transitions
- 🌫️ Backdrop blur effect

### Top Loading Bar
- 📈 NProgress-style bar
- 🌈 Gradient animation
- ⚡ Auto-simulation
- ✅ Auto-completion

### Easy Integration
- 🎯 Simple hooks
- 🔄 Automatic cleanup
- 🛡️ Error handling
- 📱 Responsive design

---

## 💡 Common Use Cases

### API Calls
```jsx
await withLoading(async () => {
  await fetch('/api/users');
}, 'Fetching users...');
```

### Form Submission
```jsx
await withLoading(async () => {
  await fetch('/api/submit', { method: 'POST', body: data });
}, 'Submitting form...');
```

### File Upload
```jsx
startLoading('Uploading...');
// Track upload progress with updateProgress()
stopLoading();
```

### Page Navigation
```jsx
startLoading('Loading page...');
router.push('/dashboard');
// Stop in destination page
```

---

## 🔧 Customization

### Change Colors
Edit `src/components/LoadingPage.jsx` and `src/components/LoadingBar.jsx` to customize colors:

```jsx
// Change primary color
className="bg-primary" // Change to bg-blue-500, etc.
```

### Change Animation
Edit the spinner in `LoadingPage.jsx`:

```jsx
<div className="h-16 w-16 rounded-full border-4 border-muted animate-spin border-t-primary">
```

### Adjust Timing
Change transition duration:

```jsx
className="transition-opacity duration-300" // Change 300 to your preference
```

---

## 📚 Next Steps

1. **Read the full guide**: `LOADING_SYSTEM_GUIDE.md`
2. **Check examples**: `src/examples/LOADING_USAGE_EXAMPLES.js`
3. **Try the demo**: `http://localhost:3000/loading-demo`
4. **Integrate into your components**: Use `useAsyncLoad` hook

---

## ⚡ Pro Tips

1. **Always use try-finally** to ensure loading stops even on errors
2. **Use withLoading** for simplicity instead of manual start/stop
3. **Provide meaningful messages** to improve user experience
4. **Update progress appropriately** for long operations
5. **Test on slow connections** to see the full effect

---

## 🎉 You're All Set!

The loading system is ready to use. Start adding it to your components:

```jsx
import { useAsyncLoad } from '@/hooks/useAsyncLoad';

const { withLoading } = useAsyncLoad();

await withLoading(async () => {
  // Your code here
}, 'Loading...');
```

**Need help?** Check `LOADING_SYSTEM_GUIDE.md` for detailed documentation!

---

**Happy coding! 🚀**
