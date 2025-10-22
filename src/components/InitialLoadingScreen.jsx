'use client';

import { useEffect, useState } from 'react';

/**
 * InitialLoadingScreen - Modern, optimized loading page for app initialization
 * 
 * Features:
 * - Appears on first load/refresh before any content
 * - Smooth fade transitions
 * - Multiple animation styles (spinner, pulse, shimmer)
 * - Prevents UI flicker
 * - Auto-hides when app is ready
 * 
 * Performance optimizations:
 * - Uses CSS animations (GPU-accelerated)
 * - Minimal re-renders
 * - Efficient state management
 */
export default function InitialLoadingScreen({ isLoading }) {
  const [shouldRender, setShouldRender] = useState(true);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      // Start fade-out animation
      setIsVisible(false);
      
      // Remove from DOM after animation completes
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 600); // Match transition duration

      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  // Don't render if not needed (performance optimization)
  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 z-[10000] flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/30 transition-opacity duration-500 ease-out ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        // Prevent scrolling while loading
        position: 'fixed',
        overflow: 'hidden',
      }}
    >
      {/* Main Content Container */}
      <div className="flex flex-col items-center justify-center space-y-8 p-8">
        
        {/* Logo or Brand Name */}
        <div className="relative">
          <div className="animate-pulse">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
              Infinity Club
            </h1>
          </div>
        </div>

        {/* Modern Spinner - Option 1: Circular */}
        <div className="relative w-20 h-20">
          {/* Outer rotating ring */}
          <div className="absolute inset-0 rounded-full border-4 border-muted"></div>
          
          {/* Animated spinner */}
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary border-r-primary animate-spin"></div>
          
          {/* Inner pulsing dot */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Loading Text */}
        <div className="text-center space-y-3">
          <p className="text-lg font-medium text-foreground animate-pulse">
            Loading your experience...
          </p>
          
          {/* Animated dots */}
          <div className="flex justify-center space-x-2">
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
          </div>
        </div>

        {/* Progress Bar (Optional - shows automatic progress) */}
        <div className="w-64 h-1.5 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-primary via-primary/80 to-primary animate-loading-progress rounded-full"></div>
        </div>

        {/* Shimmer Effect (Alternative) */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer"></div>
        </div>
      </div>

      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        {/* Animated circles */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>
    </div>
  );
}
