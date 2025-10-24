'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

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
          
          {/* Infinity Logo */}
          <div className="relative w-16 h-16">
            <Image
              src="/assest/ChatGPT Image 23 oct. 2025, 11_35_49.png"
              alt="Infinity Logo"
              fill
              className="object-contain animate-spin"
              style={{ animationDuration: '2s' }}
              priority
            />
          </div>
        </div>

        {/* Loading text */}
        <p className="text-sm text-muted-foreground animate-pulse">
          Loading...
        </p>
      </div>
    </div>
  );
}
