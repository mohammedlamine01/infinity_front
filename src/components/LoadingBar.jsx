'use client';

import { useEffect, useState } from 'react';
import { useLoading } from '@/contexts/LoadingContext';

export default function LoadingBar() {
  const { isLoading } = useLoading();
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isLoading) {
      setIsVisible(true);
      setProgress(0);

      // Simulate progress
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(interval);
            return 90;
          }
          return prev + Math.random() * 10;
        });
      }, 200);

      return () => clearInterval(interval);
    } else {
      // Complete the progress
      setProgress(100);
      // Hide after animation
      const timer = setTimeout(() => {
        setIsVisible(false);
        setProgress(0);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[10000] h-1">
      <div
        className="h-full bg-gradient-to-r from-primary via-primary/80 to-primary transition-all duration-300 ease-out shadow-lg shadow-primary/50"
        style={{
          width: `${progress}%`,
          transition: progress === 100 ? 'width 0.4s ease-out' : 'width 0.3s ease-out',
        }}
      ></div>
    </div>
  );
}
