# 🎯 React Loading System - README

A production-ready, comprehensive loading system for Next.js/React applications with full-page overlays, progress tracking, and top loading bars.

---

## 🌟 Features

- ✅ **Full-Page Loading Overlay** - Beautiful animated spinner with backdrop blur
- ✅ **Top Loading Bar** - NProgress-style progress bar at the top
- ✅ **Progress Tracking** - 0-100% progress with custom messages
- ✅ **Global State Management** - React Context-based for easy access
- ✅ **Easy-to-Use Hooks** - Simple API for any component
- ✅ **Smooth Animations** - Fade transitions and smooth progress
- ✅ **Automatic Cleanup** - No memory leaks, handles errors
- ✅ **TypeScript Ready** - Easy to add type definitions
- ✅ **Fully Customizable** - Change colors, animations, and styles
- ✅ **Production Ready** - Optimized and tested

---

## 📦 Installation

Already installed! The system is integrated into your app.

### Files Structure

```
src/
├── contexts/
│   └── LoadingContext.jsx          # Global state management
├── components/
│   ├── LoadingPage.jsx             # Full-page overlay
│   └── LoadingBar.jsx              # Top progress bar
├── hooks/
│   └── useAsyncLoad.js             # Helper hook
└── examples/
    ├── LOADING_USAGE_EXAMPLES.js   # Code examples
    ├── ProductsPageExample.jsx     # Real example
    └── DashboardExample.jsx        # Real example
```

---

## 🚀 Quick Start

### Basic Usage

```jsx
import { useAsyncLoad } from '@/hooks/useAsyncLoad';

export default function MyComponent() {
  const { withLoading } = useAsyncLoad('Loading...');

  const fetchData = async () => {
    await withLoading(async () => {
      const response = await fetch('/api/data');
      const data = await response.json();
      // Use data...
    });
  };

  return <button onClick={fetchData}>Load Data</button>;
}
```

### With Progress

```jsx
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

        updateProgress(100);
      },
      { message: 'Loading...' }
    );
  };

  return <button onClick={loadData}>Load All</button>;
}
```

---

## 📖 API Reference

### useLoading Hook

```jsx
import { useLoading } from '@/contexts/LoadingContext';

const {
  isLoading,        // boolean - Current loading state
  loadingMessage,   // string - Current message
  progress,         // number - Progress (0-100)
  startLoading,     // (message?: string) => void
  stopLoading,      // () => void
  updateProgress,   // (value: number) => void
  updateMessage,    // (message: string) => void
} = useLoading();
```

### useAsyncLoad Hook

```jsx
import { useAsyncLoad } from '@/hooks/useAsyncLoad';

const {
  withLoading,              // (asyncFn, message?) => Promise
  withLoadingAndProgress,   // (asyncFn, options?) => Promise
  startLoading,             // (message?: string) => void
  stopLoading,              // () => void
  updateProgress,           // (value: number) => void
  updateMessage,            // (message: string) => void
} = useAsyncLoad(defaultMessage?);
```

---

## 💡 Usage Examples

### API Call

```jsx
await withLoading(async () => {
  const response = await fetch('/api/users');
  const users = await response.json();
  setUsers(users);
}, 'Fetching users...');
```

### Form Submission

```jsx
await withLoading(async () => {
  await fetch('/api/submit', {
    method: 'POST',
    body: JSON.stringify(formData),
  });
}, 'Submitting form...');
```

### File Upload

```jsx
const { startLoading, stopLoading, updateProgress } = useLoading();

const handleUpload = async (file) => {
  startLoading('Uploading file...');
  
  const xhr = new XMLHttpRequest();
  xhr.upload.addEventListener('progress', (e) => {
    const percent = (e.loaded / e.total) * 100;
    updateProgress(percent);
  });
  
  // Upload logic...
  stopLoading();
};
```

### Multiple Parallel Requests

```jsx
await withLoadingAndProgress(
  async (updateProgress) => {
    const [users, products, orders] = await Promise.all([
      fetch('/api/users').then(r => r.json()).finally(() => updateProgress(33)),
      fetch('/api/products').then(r => r.json()).finally(() => updateProgress(66)),
      fetch('/api/orders').then(r => r.json()).finally(() => updateProgress(100)),
    ]);
  },
  { message: 'Loading data...' }
);
```

### Page Load

```jsx
useEffect(() => {
  const loadPageData = async () => {
    await withLoading(async () => {
      const data = await fetch('/api/page-data');
      setPageData(await data.json());
    }, 'Loading page...');
  };
  
  loadPageData();
}, []);
```

---

## 🎨 Customization

### Change Colors

Edit `src/components/LoadingPage.jsx`:

```jsx
// Change spinner color
className="border-t-primary" // Change to border-t-blue-500

// Change backdrop
className="bg-background/80" // Adjust opacity
```

Edit `src/components/LoadingBar.jsx`:

```jsx
// Change bar gradient
className="bg-gradient-to-r from-primary via-primary/80 to-primary"
```

### Change Animation Speed

```jsx
// In LoadingPage.jsx
className="transition-opacity duration-300" // Change duration

// In LoadingBar.jsx
style={{ transition: 'width 0.3s ease-out' }} // Change timing
```

### Change Spinner Style

Replace the spinner in `LoadingPage.jsx` with your custom animation:

```jsx
{/* Custom spinner */}
<div className="your-custom-spinner-classes">
  {/* Your animation */}
</div>
```

---

## 🧪 Testing

Visit the demo page:

```
http://localhost:3000/loading-demo
```

Test scenarios included:
- Simple loading
- Progress tracking
- API simulation
- File upload simulation
- Multi-step process
- Long operations

---

## 📚 Documentation

- **Quick Start**: [LOADING_QUICK_START.md](./LOADING_QUICK_START.md)
- **Complete Guide**: [LOADING_SYSTEM_GUIDE.md](./LOADING_SYSTEM_GUIDE.md)
- **Implementation**: [LOADING_SYSTEM_IMPLEMENTATION.md](./LOADING_SYSTEM_IMPLEMENTATION.md)
- **Code Examples**: [src/examples/LOADING_USAGE_EXAMPLES.js](./src/examples/LOADING_USAGE_EXAMPLES.js)

---

## ✅ Best Practices

1. **Always use try-finally** to ensure loading stops
   ```jsx
   try {
     startLoading();
     // Operations...
   } finally {
     stopLoading();
   }
   ```

2. **Use withLoading for simplicity**
   ```jsx
   await withLoading(async () => {
     // Your code
   });
   ```

3. **Provide meaningful messages**
   ```jsx
   startLoading('Fetching user data...');
   ```

4. **Update progress appropriately**
   ```jsx
   updateProgress(25);  // After each step
   ```

5. **Handle errors gracefully**
   ```jsx
   try {
     await withLoading(async () => {
       // Operations
     });
   } catch (error) {
     // Handle error
   }
   ```

---

## 🔧 Troubleshooting

### Loading doesn't appear

- Ensure `LoadingProvider` is in your `layout.jsx`
- Check that `LoadingPage` and `LoadingBar` are rendered
- Verify you're calling `startLoading()` or `withLoading()`

### Loading doesn't stop

- Always use `try-finally` blocks
- Check for errors in your async operations
- Use `withLoading()` for automatic cleanup

### Progress not updating

- Call `updateProgress()` with values between 0-100
- Use `withLoadingAndProgress()` instead of `withLoading()`
- Ensure you're passing the `updateProgress` function correctly

---

## 🎯 Common Patterns

### Pattern 1: Simple Fetch

```jsx
const { withLoading } = useAsyncLoad();

const loadData = () => withLoading(
  async () => await fetch('/api/data').then(r => r.json()),
  'Loading...'
);
```

### Pattern 2: Multi-Step

```jsx
const { withLoadingAndProgress } = useAsyncLoad();

const multiStep = () => withLoadingAndProgress(
  async (updateProgress, updateMessage) => {
    updateMessage('Step 1...'); updateProgress(25);
    await step1();
    updateMessage('Step 2...'); updateProgress(50);
    await step2();
    updateProgress(100);
  }
);
```

### Pattern 3: Retry Logic

```jsx
const { withLoading } = useAsyncLoad();

const fetchWithRetry = (url, retries = 3) => withLoading(
  async () => {
    for (let i = 0; i < retries; i++) {
      try {
        return await fetch(url).then(r => r.json());
      } catch (error) {
        if (i === retries - 1) throw error;
        await new Promise(r => setTimeout(r, 1000));
      }
    }
  },
  'Fetching data...'
);
```

---

## 🚀 Performance

- **Lightweight**: No external dependencies
- **Optimized**: Smooth 60fps animations
- **Efficient**: Minimal re-renders
- **Smart**: Auto-cleanup prevents memory leaks

---

## 🎉 Support

- Check documentation files
- Review examples in `src/examples/`
- Test with demo page at `/loading-demo`
- Customize to fit your needs

---

## 📝 License

Part of your project. Use freely!

---

## 🙏 Acknowledgments

Built with:
- React Context API
- Next.js App Router
- Tailwind CSS
- Modern React patterns

---

**Made with ❤️ for your React app**

---

## Quick Links

- 📖 [Complete Guide](./LOADING_SYSTEM_GUIDE.md)
- 🚀 [Quick Start](./LOADING_QUICK_START.md)
- 💻 [Code Examples](./src/examples/LOADING_USAGE_EXAMPLES.js)
- 🎮 [Live Demo](/loading-demo)

---

**Happy coding! 🎯**
