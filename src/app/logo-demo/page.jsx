'use client';

import { useState } from 'react';
import LogoIntro from '@/components/LogoIntro';
import LogoIntroAdvanced from '@/components/LogoIntroAdvanced';
import { Button } from '@/components/ui/button';

export default function LogoIntroDemo() {
  const [showBasic, setShowBasic] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showSquare, setShowSquare] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-primary to-primary/70 bg-clip-text text-transparent">
            Logo Intro Animation Demo
          </h1>
          <p className="text-muted-foreground text-lg">
            Click the buttons below to preview the cinematic logo animations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Basic Version */}
          <div className="bg-gradient-to-br from-card to-primary/5 rounded-3xl p-8 border-2 border-primary/30 shadow-xl hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300">
            <div className="mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-primary/30">
                <svg className="w-8 h-8 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-foreground">Basic Version</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Uses your existing logo image with 3D rotation and neon effects
              </p>
            </div>
            <Button 
              onClick={() => setShowBasic(true)}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Preview Basic
            </Button>
          </div>

          {/* Advanced Version (16:9) */}
          <div className="bg-gradient-to-br from-card to-primary/5 rounded-3xl p-8 border-2 border-primary/30 shadow-xl hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300">
            <div className="mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-primary/30">
                <svg className="w-8 h-8 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-foreground">Advanced 16:9</h3>
              <p className="text-sm text-muted-foreground mb-4">
                SVG-based infinity symbol with cinematic widescreen format
              </p>
            </div>
            <Button 
              onClick={() => setShowAdvanced(true)}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Preview 16:9
            </Button>
          </div>

          {/* Advanced Version (1:1) */}
          <div className="bg-gradient-to-br from-card to-primary/5 rounded-3xl p-8 border-2 border-primary/30 shadow-xl hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300">
            <div className="mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-primary/30">
                <svg className="w-8 h-8 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V5z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-foreground">Advanced 1:1</h3>
              <p className="text-sm text-muted-foreground mb-4">
                SVG-based infinity symbol in square format for icons
              </p>
            </div>
            <Button 
              onClick={() => setShowSquare(true)}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Preview 1:1
            </Button>
          </div>
        </div>

        {/* Features */}
        <div className="bg-gradient-to-br from-card to-primary/5 rounded-3xl p-8 border-2 border-primary/30 shadow-xl mb-12">
          <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            ✨ Animation Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <div className="bg-primary/20 rounded-lg p-2 mt-1">
                <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold mb-1">3D Rotation</h4>
                <p className="text-sm text-muted-foreground">Smooth 360° rotation with depth perception</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-primary/20 rounded-lg p-2 mt-1">
                <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold mb-1">Neon Glow</h4>
                <p className="text-sm text-muted-foreground">Soft green aura with realistic light falloff</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-primary/20 rounded-lg p-2 mt-1">
                <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold mb-1">Cinematic Lighting</h4>
                <p className="text-sm text-muted-foreground">Dynamic reflections and metallic sheen</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-primary/20 rounded-lg p-2 mt-1">
                <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold mb-1">Seamless Loop</h4>
                <p className="text-sm text-muted-foreground">Perfectly loops for continuous display</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-primary/20 rounded-lg p-2 mt-1">
                <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold mb-1">Particle Effects</h4>
                <p className="text-sm text-muted-foreground">Floating particles in the background</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-primary/20 rounded-lg p-2 mt-1">
                <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold mb-1">GPU Accelerated</h4>
                <p className="text-sm text-muted-foreground">Optimized for smooth performance</p>
              </div>
            </div>
          </div>
        </div>

        {/* Code Example */}
        <div className="bg-gradient-to-br from-card to-primary/5 rounded-3xl p-8 border-2 border-primary/30 shadow-xl">
          <h2 className="text-2xl font-bold mb-4 text-foreground">Quick Start</h2>
          <div className="bg-black/50 rounded-xl p-6 overflow-x-auto border border-primary/20">
            <pre className="text-sm text-green-400">
              <code>{`import LogoIntro from '@/components/LogoIntro';

function App() {
  return (
    <LogoIntro 
      onComplete={() => console.log('Done!')}
      duration={5000}
    />
  );
}`}</code>
            </pre>
          </div>
        </div>
      </div>

      {/* Render animations */}
      {showBasic && (
        <LogoIntro 
          onComplete={() => setShowBasic(false)}
          duration={5000}
        />
      )}

      {showAdvanced && (
        <LogoIntroAdvanced 
          onComplete={() => setShowAdvanced(false)}
          duration={5000}
          aspectRatio="16:9"
        />
      )}

      {showSquare && (
        <LogoIntroAdvanced 
          onComplete={() => setShowSquare(false)}
          duration={5000}
          aspectRatio="1:1"
        />
      )}
    </div>
  );
}
