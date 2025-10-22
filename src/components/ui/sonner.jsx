'use client';

import { Toaster as Sonner } from 'sonner';

export function Toaster() {
  return (
    <Sonner
      position="top-right"
      toastOptions={{
        className: 'dark:bg-gray-800 dark:text-white dark:border-gray-700',
      }}
    />
  );
}
