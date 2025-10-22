'use client';

import { useAuth } from '@/contexts/AuthContext';
import InitialLoadingScreen from '@/components/InitialLoadingScreen';
// Alternative loading screens (uncomment to use):
// import SkeletonLoadingScreen from '@/components/SkeletonLoadingScreen';
// import MinimalLoadingScreen from '@/components/MinimalLoadingScreen';

/**
 * AppInitializer - Manages initial app loading state
 * 
 * Purpose:
 * - Shows loading screen on first load/refresh
 * - Waits for authentication and initial data
 * - Prevents UI flicker and partial content display
 * - Smoothly transitions to main app
 * 
 * Usage:
 * Wrap your main app content with this component in layout.jsx
 * 
 * Performance:
 * - Uses React Suspense patterns
 * - Minimal re-renders
 * - Efficient state checks
 * 
 * @param {React.ReactNode} children - App content to render after loading
 */
export default function AppInitializer({ children }) {
  const { loading, isInitialLoading } = useAuth();

  // Show initial loading screen while app initializes
  // This prevents any UI from rendering until we're ready
  const isLoading = loading || isInitialLoading;

  return (
    <>
      {/* Initial Loading Screen - renders above everything */}
      <InitialLoadingScreen isLoading={isLoading} />
      
      {/* Alternative loading screens - uncomment one to use */}
      {/* <SkeletonLoadingScreen isLoading={isLoading} /> */}
      {/* <MinimalLoadingScreen isLoading={isLoading} /> */}

      {/* Main app content - only renders after loading complete */}
      {/* Using opacity transition for smooth reveal */}
      <div
        className={`transition-opacity duration-500 ${
          isLoading ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        {children}
      </div>
    </>
  );
}
