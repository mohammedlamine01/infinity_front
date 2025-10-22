'use client';

import { useEffect, useState } from 'react';

/**
 * SkeletonLoadingScreen - Modern skeleton screen for initial app load
 * 
 * Shows placeholder content while data is loading
 * Better UX than blank spinner - gives users context of what's loading
 * 
 * Features:
 * - Shimmer animation
 * - Mimics actual UI structure
 * - Smooth fade transition
 * - Accessible and performant
 */
export default function SkeletonLoadingScreen({ isLoading }) {
  const [shouldRender, setShouldRender] = useState(true);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      setIsVisible(false);
      const timer = setTimeout(() => setShouldRender(false), 500);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 z-[10000] bg-background transition-opacity duration-500 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="flex flex-col min-h-screen">
        {/* Navbar Skeleton */}
        <div className="border-b border-border">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              {/* Logo skeleton */}
              <div className="h-8 w-32 bg-muted rounded animate-shimmer-skeleton"></div>
              
              {/* Nav items skeleton */}
              <div className="flex space-x-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-4 w-16 bg-muted rounded animate-shimmer-skeleton"></div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Skeleton */}
        <div className="flex-grow container mx-auto px-4 py-8">
          {/* Hero Section Skeleton */}
          <div className="mb-12">
            <div className="h-12 w-3/4 bg-muted rounded mb-4 animate-shimmer-skeleton"></div>
            <div className="h-6 w-1/2 bg-muted rounded mb-6 animate-shimmer-skeleton"></div>
            <div className="h-10 w-32 bg-muted rounded animate-shimmer-skeleton"></div>
          </div>

          {/* Cards Grid Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border border-border rounded-lg p-6 space-y-4">
                <div className="h-40 bg-muted rounded animate-shimmer-skeleton"></div>
                <div className="h-6 bg-muted rounded animate-shimmer-skeleton"></div>
                <div className="h-4 w-3/4 bg-muted rounded animate-shimmer-skeleton"></div>
                <div className="h-4 w-1/2 bg-muted rounded animate-shimmer-skeleton"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Shimmer Overlay Effect */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer-slow"></div>
        </div>
      </div>
    </div>
  );
}
