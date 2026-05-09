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
        {/* ✅ Primary SEO */}
        <title>Infinity Club | Club BBA - نادي جامعة برج بوعريريج</title>
        <meta name="description" content="Infinity Club is the official student tech club at University of BBA (Mohamed El Bachir El Ibrahimi), Bordj Bou Arreridj, Algeria. Workshops, hackathons, and tech talks." />
        <meta name="keywords" content="Infinity Club, Club BBA, نادي إنفينيتي, جامعة برج بوعريريج, club informatique BBA, student club Algeria, univ-bba, Mohamed El Bachir El Ibrahimi university club" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Infinity Club - University of BBA" />
        <link rel="canonical" href="https://infinityfront.vercel.app" />

        {/* ✅ Google Verification */}
        <meta name="google-site-verification" content="zBg_KBzmN12HVr452bQ08dKjaynMrOHQRVYlDnNojNk" />

        {/* ✅ Open Graph (Facebook, WhatsApp, LinkedIn) */}
        <meta property="og:title" content="Infinity Club | Club BBA - University of BBA Algeria" />
        <meta property="og:description" content="Official student tech club at University of BBA, Algeria. Join us for coding workshops, hackathons, and tech talks." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://infinityfront.vercel.app" />
        <meta property="og:image" content="https://infinityfront.vercel.app/favicon.png" />
        <meta property="og:site_name" content="Infinity Club BBA" />
        <meta property="og:locale" content="en_US" />

        {/* ✅ Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Infinity Club | Club BBA" />
        <meta name="twitter:description" content="Official student tech club at University of BBA, Algeria." />
        <meta name="twitter:image" content="https://infinityfront.vercel.app/favicon.png" />

        {/* ✅ Structured Data (JSON-LD) — helps Google understand your club */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Infinity Club",
              "alternateName": ["Club BBA", "Infinity Club BBA", "نادي إنفينيتي"],
              "url": "https://infinityfront.vercel.app",
              "logo": "https://infinityfront.vercel.app/favicon.png",
              "description": "Student tech club at University of BBA (Mohamed El Bachir El Ibrahimi), Bordj Bou Arreridj, Algeria.",
              "email": "infinity.tech@univ-bba.dz",
              "sameAs": [
                "https://instagram.com/club_infinity",
                "https://facebook.com/infinity.club",
                "https://youtube.com/@club_infinity"
              ],
              "parentOrganization": {
                "@type": "CollegeOrUniversity",
                "name": "Université Mohamed El Bachir El Ibrahimi - BBA",
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "Bordj Bou Arreridj",
                  "addressCountry": "DZ"
                }
              }
            })
          }}
        />

        <link rel="icon" href="/favicon.png" />
      </head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <LoadingProvider>
            <LanguageProvider>
              <AuthProvider>
                <LoadingBar />
                <LoadingPage />
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