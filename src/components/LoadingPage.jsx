'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useLoading } from '@/contexts/LoadingContext';

export default function LoadingPage() {
  const { isLoading, loadingMessage, progress } = useLoading();
  const [shouldRender, setShouldRender] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isLoading) {
      // Show the component
      setShouldRender(true);
      // Small delay for smooth fade-in
      setTimeout(() => setIsVisible(true), 10);
    } else {
      // Start fade-out
      setIsVisible(false);
      // Remove from DOM after animation completes
      const timer = setTimeout(() => setShouldRender(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-background/80 backdrop-blur-sm transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="flex flex-col items-center space-y-6 p-8">
        {/* Infinity Logo */}
        <div className="relative">
          <div className="relative w-20 h-20">
            <Image
              src="/assest/ChatGPT Image 23 oct. 2025, 11_35_49.png"
              alt="Infinity Logo"
              fill
              className="object-contain animate-spin"
              style={{ animationDuration: '2s' }}
              priority
            />
          </div>
          
          {/* Glow effect */}
          <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl animate-pulse"></div>
        </div>

        {/* Loading message */}
        {loadingMessage && (
          <div className="text-center space-y-2">
            <p className="text-lg font-medium text-foreground animate-pulse">
              {loadingMessage}
            </p>
          </div>
        )}

        {/* Progress bar */}
        {progress > 0 && (
          <div className="w-64 space-y-2">
            <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-300 ease-out rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              {progress}%
            </p>
          </div>
        )}

        {/* Animated dots */}
        <div className="flex space-x-2">
          <div className="h-2 w-2 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]"></div>
          <div className="h-2 w-2 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]"></div>
          <div className="h-2 w-2 rounded-full bg-primary animate-bounce"></div>
        </div>
      </div>
    </div>
  );
}
