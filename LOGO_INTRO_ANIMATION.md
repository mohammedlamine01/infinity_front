# 🎬 Cinematic Logo Intro Animation

A stunning 3D rotating logo animation with neon green glow effects, perfect for website intros and splash screens.

## 🌟 Features

### Visual Effects
- ✨ **3D Rotation**: Smooth 360° rotation on Y-axis with subtle X and Z tilts
- 💚 **Neon Green Glow**: Soft, pulsing green aura with realistic light falloff
- 🎭 **Cinematic Lighting**: Dynamic light reflections and metallic sheen
- 🌊 **Multiple Shadow Layers**: Depth perception with layered shadows
- ⭐ **Particle Effects**: Floating particles in the background
- 🌈 **Gradient Backgrounds**: Dark gradient with animated overlays
- 💫 **Glow Rings**: Pulsing concentric rings for emphasis

### Technical Features
- 🔄 **Seamless Loop**: Perfectly loops for continuous display
- 📱 **Responsive**: Adapts to different screen sizes
- ⚡ **Performance Optimized**: CSS transforms and GPU acceleration
- 🎯 **Customizable**: Duration, aspect ratio, and callback support
- 🖼️ **Two Versions**: Image-based and SVG-based implementations

## 📦 Components

### 1. LogoIntro (Image-based)
Uses your existing logo image with 3D effects.

```jsx
import LogoIntro from '@/components/LogoIntro';

function App() {
  return (
    <LogoIntro 
      onComplete={() => console.log('Animation complete')}
      duration={5000}
    />
  );
}
```

### 2. LogoIntroAdvanced (SVG-based)
Pure SVG implementation with custom infinity symbol.

```jsx
import LogoIntroAdvanced from '@/components/LogoIntroAdvanced';

function App() {
  return (
    <LogoIntroAdvanced 
      onComplete={() => console.log('Animation complete')}
      duration={5000}
      aspectRatio="16:9" // or "1:1"
    />
  );
}
```

## 🎨 Animation Details

### 3D Rotation
- **Duration**: 5 seconds per full rotation
- **Easing**: Cubic bezier for smooth motion
- **Axis**: Primary Y-axis with subtle X and Z tilts
- **Perspective**: 1200px for depth perception

### Lighting Effects

#### 1. Neon Glow
- **Color**: Primary green (oklch(0.6273 0.1700 149.2005))
- **Layers**: Triple drop-shadow for depth
- **Animation**: 2-second pulse cycle
- **Blur**: 20-60px for soft edges

#### 2. Metallic Sheen
- **Direction**: 135° diagonal sweep
- **Speed**: 3-second cycle
- **Colors**: White with varying opacity (10-30%)
- **Blend**: Overlay mode for realism

#### 3. Light Reflections
- **Pattern**: Gradient from top-right to bottom-left
- **Animation**: Subtle shift and rotation
- **Opacity**: 30-70% range

#### 4. Shadow Depth
- **Layers**: 3 shadow layers at different Z positions
- **Blur**: 30-50px for soft shadows
- **Opacity**: 20-60% for realistic falloff

### Background Effects

#### Cinematic Gradient
- **Base**: Black to dark gray gradient
- **Overlay**: Radial green gradient at 15% opacity
- **Animation**: Breathing effect (6s cycle)

#### Particle System
- **Count**: 20 floating particles
- **Size**: 2px dots with green glow
- **Motion**: Upward float with random horizontal drift
- **Duration**: 5-15 seconds per particle

#### Glow Rings
- **Rings**: 4 concentric rings
- **Sizes**: 350px to 800px
- **Colors**: Green with 10-25% opacity
- **Animation**: Staggered pulse (3-6s cycles)

## 🎛️ Props

### LogoIntro / LogoIntroAdvanced

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onComplete` | Function | undefined | Callback when animation ends |
| `duration` | Number | 5000 | Total duration in milliseconds |
| `aspectRatio` | String | '16:9' | '16:9' or '1:1' (Advanced only) |

## 🚀 Usage Examples

### Basic Website Intro
```jsx
'use client';

import { useState } from 'react';
import LogoIntro from '@/components/LogoIntro';
import HomePage from '@/components/HomePage';

export default function App() {
  const [showIntro, setShowIntro] = useState(true);

  if (showIntro) {
    return <LogoIntro onComplete={() => setShowIntro(false)} />;
  }

  return <HomePage />;
}
```

### With Loading State
```jsx
'use client';

import { useState, useEffect } from 'react';
import LogoIntroAdvanced from '@/components/LogoIntroAdvanced';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    // Preload your app data
    loadAppData().then(() => setIsLoading(false));
  }, []);

  if (showIntro || isLoading) {
    return (
      <LogoIntroAdvanced 
        onComplete={() => !isLoading && setShowIntro(false)}
        duration={5000}
        aspectRatio="16:9"
      />
    );
  }

  return <MainApp />;
}
```

### Conditional Display (First Visit Only)
```jsx
'use client';

import { useState, useEffect } from 'react';
import LogoIntro from '@/components/LogoIntro';

export default function App() {
  const [showIntro, setShowIntro] = useState(false);

  useEffect(() => {
    const hasSeenIntro = localStorage.getItem('hasSeenIntro');
    if (!hasSeenIntro) {
      setShowIntro(true);
      localStorage.setItem('hasSeenIntro', 'true');
    }
  }, []);

  if (showIntro) {
    return <LogoIntro onComplete={() => setShowIntro(false)} />;
  }

  return <MainContent />;
}
```

## 🎨 Customization

### Changing Colors

To use a different color scheme, modify the CSS variables:

```jsx
// In your component
<style jsx>{`
  .logo-svg {
    filter: drop-shadow(0 0 20px rgba(255, 100, 100, 0.9)); /* Red instead of green */
  }
  
  .glow-ring-1 {
    background: radial-gradient(circle, rgba(255, 100, 100, 0.1) 0%, transparent 70%);
  }
`}</style>
```

### Adjusting Animation Speed

```jsx
// Slower rotation
@keyframes rotate3D {
  /* Change from 5s to 8s */
  animation: rotate3D 8s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite;
}

// Faster glow pulse
.logo-neon-aura {
  animation: aura-pulse 1s ease-in-out infinite; /* Changed from 2s */
}
```

### Custom Logo Image

Replace the image path in LogoIntro component:

```jsx
<Image
  src="/your-logo-path.png"  // Change this
  alt="Logo"
  width={256}
  height={256}
  className="w-full h-full object-contain logo-image"
  priority
/>
```

### Custom SVG Shape

In LogoIntroAdvanced, modify the SVG paths:

```jsx
<svg viewBox="0 0 200 200" className="w-full h-full logo-svg">
  {/* Add your custom SVG paths here */}
  <path d="M..." fill="url(#logoGradient)" />
</svg>
```

## 🎯 Performance Optimization

### Tips for Smooth Animation
1. **Use GPU acceleration**: Transforms and opacity are GPU-accelerated
2. **Avoid layout changes**: All animations use transform and opacity only
3. **Preload images**: Use Next.js Image component with `priority` prop
4. **Limit particles**: Reduce particle count on mobile devices
5. **Use will-change**: Added to animated elements for optimization

### Mobile Optimization
```jsx
// Reduce particles on mobile
const particleCount = typeof window !== 'undefined' && window.innerWidth < 768 ? 10 : 20;

{[...Array(particleCount)].map((_, i) => (
  <div key={i} className="particle" />
))}
```

## 🌐 Browser Support

- ✅ Chrome 90+
- ✅ Firefox 90+
- ✅ Safari 14+
- ✅ Edge 90+
- ⚠️ IE 11 (Limited support - no 3D transforms)

## 📋 CSS Features Used

- CSS 3D Transforms
- CSS Animations & Keyframes
- CSS Filters (blur, drop-shadow)
- CSS Gradients (linear, radial)
- CSS Blend Modes
- CSS Custom Properties
- Perspective & Transform-style

## 🎬 Animation Timeline

```
0s    - Fade in
0-5s  - Full 3D rotation cycle
      - Continuous glow pulse
      - Metallic sheen sweep
      - Light reflections shift
      - Particles float
      - Rings pulse
4.5s  - Fade out begins
5s    - Animation complete, onComplete callback fired
```

## 🔧 Troubleshooting

### Issue: Logo not visible
**Solution**: Ensure the image path is correct and the image is in the public folder.

### Issue: Animation stutters
**Solution**: 
- Reduce particle count
- Simplify shadow layers
- Check for other heavy processes running

### Issue: Colors don't match
**Solution**: Verify your CSS color variables are set correctly in your global styles.

### Issue: 3D effect not working
**Solution**: Ensure `transform-style: preserve-3d` is set on parent elements.

## 📦 Dependencies

- React 18+
- Next.js 14+ (for Image component)
- No external animation libraries required!

## 🎨 Design Credits

- **Style**: Futuristic, minimalistic, neon
- **Color Scheme**: Green neon (#63b77b / oklch(0.6273 0.1700 149.2005))
- **Inspiration**: Sci-fi interfaces, holographic displays
- **Technique**: Pure CSS 3D with strategic use of filters and blend modes

## 📝 License

MIT - Feel free to use and modify for your projects!

---

**Created**: October 23, 2025  
**Components**: LogoIntro.jsx, LogoIntroAdvanced.jsx  
**Version**: 1.0.0
