'use client';

import { useEffect, useState } from 'react';

/**
 * MinimalLoadingScreen - Ultra-minimal, fast-loading splash screen
 * 
 * Perfect for:
 * - Fast apps that load quickly
 * - Clean, modern aesthetic
 * - Minimal distraction
 * 
 * Features:
 * - Lightweight (minimal DOM elements)
 * - GPU-accelerated animations
 * - Smooth fade transitions
 * - Optimized for performance
 */
export default function MinimalLoadingScreen({ isLoading }) {
  const [shouldRender, setShouldRender] = useState(true);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      setIsVisible(false);
      const timer = setTimeout(() => setShouldRender(false), 400);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 z-[10000] flex items-center justify-center bg-background transition-all duration-400 ease-out ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      }`}
    >
      {/* Centered Content */}
      <div className="relative flex flex-col items-center space-y-6">
        
        {/* Logo/Brand */}
        <div className="relative">
          {/* Pulsing background circle */}
          <div className="absolute inset-0 -m-8 bg-primary/10 rounded-full blur-2xl animate-pulse"></div>
          
          {/* Brand text */}
          <h1 className="relative text-5xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            IC
          </h1>
        </div>

        {/* Modern Spinner */}
        <div className="relative w-12 h-12">
          {/* Spinning circle */}
          <svg
            className="animate-spin"
            viewBox="0 0 50 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              className="opacity-25"
              cx="25"
              cy="25"
              r="20"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M25 5 A20 20 0 0 1 45 25"
            ></path>
          </svg>
        </div>

        {/* Loading text */}
        <p className="text-sm text-muted-foreground animate-pulse">
          Loading...
        </p>
      </div>
    </div>
  );
}
