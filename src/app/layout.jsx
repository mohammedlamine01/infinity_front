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
        <title>Infinity Club - Algeria Tech Community</title>
        <meta name="description" content="Student tech community in Algeria focused on coding, AI, and hackathons" />
        <meta name="keywords" content="Infinity Club, Algeria tech, student developers, BBA university" />
        <meta name="google-site-verification" content="zBg_KBzmN12HVr452bQ08dKjaynMrOHQRVYlDnNojNk" />
        <meta property="og:title" content="Infinity Club - Algeria Tech Community" />
        <meta property="og:description" content="Student tech community in Algeria focused on coding, AI, and hackathons" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://infinityfront.vercel.app" />
        <meta property="og:image" content="/favicon.png" />
        <link rel="icon" href="/favicon.png" />
        <link rel="canonical" href="https://infinityfront.vercel.app" />
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
