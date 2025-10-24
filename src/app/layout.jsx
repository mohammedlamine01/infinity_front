'use client';

import React from 'react';
import { ThemeProvider } from '@/components/theme-provider';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { LoadingProvider } from '@/contexts/LoadingContext';
import AppInitializer from '@/components/AppInitializer';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LoadingPage from '@/components/LoadingPage';
import LoadingBar from '@/components/LoadingBar';
import { Toaster } from '@/components/ui/sonner';
import '@/styles/globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Infinity Club - University of BBA</title>
        <meta name="description" content="A community of innovators, developers, and researchers" />
        <link rel="icon" href="/favicon.png" />
      </head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LoadingProvider>
            <LanguageProvider>
              <AuthProvider>
                <LoadingBar />
                <LoadingPage />
                
                {/* AppInitializer manages initial loading screen */}
                <AppInitializer>
                  <div className="flex flex-col min-h-screen">
                    <Navbar />
                    <main className="flex-grow">
                      {children}
                    </main>
                    <Footer />
                  </div>
                </AppInitializer>
                
                <Toaster />
              </AuthProvider>
            </LanguageProvider>
          </LoadingProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
