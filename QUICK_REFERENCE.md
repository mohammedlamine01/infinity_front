# ⚡ Quick Reference Guide - 2025 Design System

## 🎨 Most Common Components

### Buttons

```jsx
{/* Sizes */}
<button className="btn btn-primary btn-sm">Small</button>
<button className="btn btn-primary btn-md">Default</button>
<button className="btn btn-primary btn-lg">Large</button>

{/* Variants */}
<button className="btn btn-primary">Primary</button>
<button className="btn btn-secondary">Secondary</button>
<button className="btn btn-outline">Outline</button>
<button className="btn btn-ghost">Ghost</button>
<button className="btn btn-destructive">Destructive</button>

{/* With shimmer effect */}
<button className="btn btn-primary btn-shimmer">Premium</button>
```

---

### Cards

```jsx
{/* 6 Card Variants */}
<div className="card-base card-default">...</div>    {/* Standard */}
<div className="card-base card-glass">...</div>      {/* Glassmorphism */}
<div className="card-base card-gradient">...</div>   {/* Gradient border */}
<div className="card-base card-elevated">...</div>   {/* Top border accent */}
<div className="card-base card-bordered">...</div>   {/* Animated border */}
<div className="card-base card-premium">...</div>    {/* Shimmer effect */}

{/* Card Structure */}
<div className="card-base card-default">
  <div className="card-header">
    <h3 className="card-title">Title</h3>
    <p className="card-description">Description</p>
  </div>
  <div className="card-content">Content</div>
  <div className="card-footer">Footer</div>
</div>
```

---

### Inputs

```jsx
{/* Sizes */}
<input className="input input-sm" />
<input className="input" />
<input className="input input-lg" />

{/* Textarea */}
<textarea className="input textarea"></textarea>
```

---

### Badges

```jsx
<span className="card-badge badge-primary">Primary</span>
<span className="card-badge badge-success">Success</span>
<span className="card-badge badge-warning">Warning</span>
<span className="card-badge badge-error">Error</span>
<span className="card-badge badge-info">Info</span>
```

---

### Loading States

```jsx
{/* Skeleton */}
<div className="skeleton" style={{ width: '200px', height: '20px' }}></div>

{/* Spinner */}
<div className="spinner"></div>
```

---

## 🎯 Utility Classes

### Hover Effects

```jsx
<div className="hover-lift">Lifts on hover</div>
<div className="hover-scale">Scales on hover</div>
<div className="hover-glow">Glows on hover</div>
```

### Animations

```jsx
<div className="animate-fade-in">Fades in</div>
<div className="animate-slide-in-up">Slides up</div>
<div className="animate-slide-in-down">Slides down</div>
<div className="animate-scale-in">Scales in</div>
```

### Effects

```jsx
<div className="glass">Glassmorphism</div>
<h1 className="text-gradient">Gradient text</h1>
<h1 className="text-gradient-primary">Primary gradient</h1>
```

---

## 🎨 Color Variables (Most Used)

```css
/* Backgrounds */
var(--background)
var(--card)
var(--popover)

/* Text */
var(--foreground)
var(--muted-foreground)

/* Borders */
var(--border)
var(--border-hover)
var(--border-focus)

/* Primary */
var(--primary)
var(--primary-600)      /* Hover */
var(--primary-700)      /* Active */
var(--primary-foreground)

/* Status */
var(--success)
var(--warning)
var(--error)
var(--info)

/* Grays */
var(--gray-50) to var(--gray-950)
```

---

## 📐 Spacing Scale

```css
var(--space-1)    /* 4px */
var(--space-2)    /* 8px */
var(--space-3)    /* 12px */
var(--space-4)    /* 16px */
var(--space-6)    /* 24px */
var(--space-8)    /* 32px */
var(--space-12)   /* 48px */
var(--space-16)   /* 64px */
```

---

## 🔵 Border Radius

```css
var(--radius-sm)     /* 4px */
var(--radius-md)     /* 8px - default */
var(--radius-lg)     /* 12px */
var(--radius-xl)     /* 16px - cards */
var(--radius-2xl)    /* 24px - modals */
var(--radius-full)   /* 9999px - pills */

/* Component specific */
var(--radius-button)
var(--radius-input)
var(--radius-card)
var(--radius-modal)
```

---

## 💫 Shadows

```css
var(--shadow-sm)     /* Light */
var(--shadow)        /* Default */
var(--shadow-md)     /* Medium */
var(--shadow-lg)     /* Large */
var(--shadow-xl)     /* Extra large */

/* Colored shadows */
var(--shadow-primary)
var(--shadow-primary-lg)

/* Inner shadows */
var(--shadow-inner)
```

---

## ⏱️ Transitions

```css
/* Durations */
var(--duration-fast)      /* 150ms */
var(--duration-base)      /* 200ms */
var(--duration-moderate)  /* 300ms */
var(--duration-slow)      /* 500ms */

/* Easing */
var(--ease-in-out)
var(--ease-spring)        /* Bouncy */
var(--ease-smooth)

/* Pre-configured */
var(--transition-colors)
var(--transition-transform)
var(--transition-shadow)
var(--transition-all)
```

---

## 📝 Typography

```css
/* Sizes */
var(--text-xs)     /* 12px */
var(--text-sm)     /* 14px */
var(--text-base)   /* 16px */
var(--text-lg)     /* 18px */
var(--text-xl)     /* 20px */
var(--text-2xl)    /* 24px */
var(--text-3xl)    /* 30px */
var(--text-4xl)    /* 36px */

/* Fonts */
var(--font-sans)
var(--font-serif)
var(--font-mono)

/* Letter spacing */
var(--tracking-tight)
var(--tracking-normal)
var(--tracking-wide)

/* Line height */
var(--leading-tight)
var(--leading-normal)
var(--leading-relaxed)
```

---

## 🌓 Dark Mode

```jsx
{/* Add to html or body */}
<html className="dark">
  {/* All components auto-adapt */}
</html>
```

All colors automatically adjust for dark mode!

---

## 📱 Responsive

Use with Tailwind breakpoints:

```jsx
<button className="btn btn-sm md:btn-md lg:btn-lg">
  Responsive
</button>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <div className="card-base card-default">...</div>
</div>
```

---

## ✨ Common Patterns

### Hero Section

```jsx
<section className="hero-section py-24">
  <h1 className="text-6xl font-bold text-gradient">Title</h1>
  <button className="btn btn-primary btn-lg btn-shimmer">CTA</button>
</section>
```

### Dashboard Grid

```jsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  {cards.map((card, i) => (
    <div 
      key={card.id}
      className="card-base card-glass animate-slide-in-up"
      style={{ animationDelay: `${i * 100}ms` }}
    >
      {/* content */}
    </div>
  ))}
</div>
```

### Loading Button

```jsx
<button className="btn btn-primary" disabled={isLoading}>
  {isLoading ? (
    <>
      <span className="spinner"></span>
      Loading...
    </>
  ) : (
    'Submit'
  )}
</button>
```

### Form

```jsx
<form className="space-y-6">
  <input className="input" placeholder="Email" />
  <textarea className="input textarea" placeholder="Message" />
  <button className="btn btn-primary w-full">Send</button>
</form>
```

---

## 🎯 Pro Tips

1. **Use semantic colors** - `var(--primary)` not `#A8D88C`
2. **Combine utilities** - `hover-lift animate-fade-in`
3. **Stagger animations** - Use `animationDelay` for lists
4. **Test dark mode** - Toggle between light/dark
5. **Check accessibility** - Use focus-visible states

---

## 🚀 Quick Start Checklist

- ✅ Import `globals.css` in your app
- ✅ Add `dark` class for dark mode
- ✅ Use component classes: `btn`, `card-base`, `input`
- ✅ Add hover effects: `hover-lift`, `hover-scale`
- ✅ Include loading states: `skeleton`, `spinner`
- ✅ Test responsive breakpoints
- ✅ Verify accessibility with keyboard navigation

---

**That's it! You're ready to build with the 2025 design system! 🎉**
