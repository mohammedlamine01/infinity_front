'use client';

import { useState, useEffect, useRef } from 'react';
import { ArrowDown, Sparkles, Zap } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { getTranslation } from '../utils/i18n';

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [orbsData, setOrbsData] = useState([]);
  const { language } = useLanguage();

  useEffect(() => {
    setMounted(true);
    
    // Generate orbs data to avoid hydration mismatch from Math.random()
    const orbs = [...Array(15)].map((_, i) => {
      const size = Math.random() * 300 + 100;
      const delay = Math.random() * 5;
      const duration = Math.random() * 15 + 20;
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      const color = i % 3 === 0 
        ? 'rgba(34, 197, 94, 0.3)' 
        : i % 3 === 1 
        ? 'rgba(74, 222, 128, 0.25)' 
        : 'rgba(134, 239, 172, 0.2)';
      return { size, delay, duration, left, top, color };
    });
    setOrbsData(orbs);
    
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-green-950 to-slate-900">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
          transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
        }} />
      </div>

      {/* Enhanced Floating Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        {orbsData.map((orb, i) => (
          <div
            key={i}
            className="absolute rounded-full blur-3xl"
            style={{
              width: `${orb.size}px`,
              height: `${orb.size}px`,
              left: `${orb.left}%`,
              top: `${orb.top}%`,
              background: `radial-gradient(circle, ${orb.color})`,
              animation: `float ${orb.duration}s ease-in-out ${orb.delay}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Dynamic Green Gradient */}
      <div 
        className="absolute inset-0 pointer-events-none transition-all duration-300"
        style={{
          background: `radial-gradient(circle 800px at ${mousePosition.x}% ${mousePosition.y}%, 
                       rgba(34, 197, 94, 0.15) 0%, 
                       transparent 60%)`,
        }}
      />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-20 text-center relative z-10">
        {/* Animated Badge */}
        <div 
          className={`inline-flex items-center gap-2 px-5 py-2.5 mb-8 rounded-full bg-green-500/10 backdrop-blur-xl border border-green-400/30 transition-all duration-700 hover:bg-green-500/20 hover:border-green-400/50 hover:scale-105 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
          }`}
        >
          <div className="relative">
            <Sparkles className="w-4 h-4 text-green-400 animate-spin-slow" />
            <div className="absolute inset-0 blur-md bg-green-400 animate-pulse" />
          </div>
          <span className="text-green-100 text-sm font-semibold tracking-wide">
            {getTranslation(language, 'heroTitle')}
          </span>
          <div className="w-2 h-2 bg-green-400 rounded-full animate-ping" />
        </div>

        {/* Hero Title with Advanced Gradient */}
        <h1 
          className={`text-6xl md:text-8xl lg:text-9xl font-black mb-8 transition-all duration-1000 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <span className="inline-block relative pb-4">
            <span className="relative z-10 bg-gradient-to-r from-white via-green-200 to-white bg-clip-text text-transparent animate-gradient-x" 
                  style={{ backgroundSize: '200% auto' }}>
              {getTranslation(language, 'heroTitle')}
            </span>
            
            {/* Multi-layer Animated Underline */}
            <span className="absolute bottom-0 left-0 right-0 h-2 md:h-3 overflow-hidden">
              <span 
                className="absolute inset-0 bg-gradient-to-r from-green-400 via-green-300 to-green-500 rounded-full animate-shimmer"
                style={{
                  width: mounted ? '100%' : '0%',
                  transition: 'width 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) 400ms',
                  backgroundSize: '200% 100%',
                }}
              />
              <span 
                className="absolute inset-0 bg-green-400 rounded-full blur-lg opacity-50 animate-pulse"
                style={{
                  width: mounted ? '100%' : '0%',
                  transition: 'width 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) 400ms',
                }}
              />
            </span>
            
            {/* Glowing Effect */}
            <span 
              className="absolute inset-0 blur-2xl bg-gradient-to-r from-green-400/0 via-green-400/30 to-green-400/0 animate-glow"
              style={{ animationDelay: '1s' }}
            />
          </span>
        </h1>

        <div 
          className={`text-xl md:text-3xl lg:text-4xl text-green-100/90 mb-14 max-w-4xl mx-auto leading-relaxed transition-all duration-800 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '600ms' }}
        >
          <p className="font-light">
            {getTranslation(language, 'heroSubtitle')}
          </p>
        </div>

        {/* Enhanced CTA Buttons */}
        <div
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 transition-all duration-700 ${
            mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
          }`}
          style={{ transitionDelay: '800ms' }}
        >
          {/* Primary Button with Multiple Effects */}
          <button
            onClick={scrollToAbout}
            className="group relative bg-gradient-to-r from-green-500 to-green-600 text-white text-lg px-10 py-5 rounded-2xl font-bold overflow-hidden shadow-2xl hover:shadow-green-500/50 transition-all duration-300 hover:scale-105 hover:-translate-y-1"
          >
            {/* Animated Background */}
            <span className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Enhanced Shimmer */}
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-out" />
            
            {/* Pulse Ring */}
            <span className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 animate-ping-slow bg-green-400" />
            
            <span className="relative flex items-center gap-3">
              <Zap className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
              {getTranslation(language, 'discoverProjects')}
              <ArrowDown className="h-5 w-5 group-hover:translate-y-1 transition-transform duration-300" />
            </span>
          </button>

          {/* Secondary Button */}
          <button
            className="group relative bg-white/5 backdrop-blur-xl text-green-100 text-lg px-10 py-5 rounded-2xl font-bold border-2 border-green-400/30 overflow-hidden hover:bg-white/10 hover:border-green-400/50 transition-all duration-300 hover:scale-105"
          >
            <span className="relative flex items-center gap-2">
              {getTranslation(language, 'learnMore')}
              <ArrowDown className="h-5 w-5 rotate-[-90deg] group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </button>
        </div>

        {/* Animated Feature Pills */}
        <div 
          className={`flex flex-wrap items-center justify-center gap-4 transition-all duration-700 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
          style={{ transitionDelay: '1000ms' }}
        >
          {[
            { icon: '🚀', text: getTranslation(language, 'innovation'), color: 'from-green-400 to-emerald-400' },
            { icon: '💻', text: getTranslation(language, 'technology'), color: 'from-emerald-400 to-teal-400' },
            { icon: '🤝', text: getTranslation(language, 'community'), color: 'from-teal-400 to-cyan-400' },
          ].map((item, i) => (
            <div
              key={i}
              className="group relative px-6 py-3 bg-white/5 backdrop-blur-xl border border-green-400/20 rounded-full text-green-100 text-sm font-medium hover:bg-white/10 hover:border-green-400/40 transition-all duration-300 cursor-pointer hover:scale-110"
              style={{ animationDelay: `${i * 100 + 1000}ms` }}
            >
              <span className={`absolute inset-0 rounded-full bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-sm`} />
              
              <span className="relative flex items-center gap-2">
                <span className="text-lg group-hover:scale-125 transition-transform duration-300">
                  {item.icon}
                </span>
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced Scroll Indicator - SLOWER Animation */}
      <div 
        className={`absolute bottom-12 left-1/2 transform -translate-x-1/2 transition-all duration-700 ${
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
        style={{ transitionDelay: '1200ms' }}
      >
        <div className="flex flex-col items-center gap-3 cursor-pointer group" onClick={scrollToAbout}>
          <span className="text-green-300/60 text-xs uppercase tracking-widest font-bold group-hover:text-green-300 transition-colors duration-500">
            {getTranslation(language, 'scrollDown')}
          </span>
          <div className="relative">
            {/* Outer Glow Ring - Slower Pulse */}
            <div className="absolute inset-[-8px] border-2 border-green-400/20 rounded-full animate-pulse-slower" />
            
            {/* Mouse Container */}
            <div className="relative w-7 h-11 border-2 border-green-400/60 rounded-full flex items-start justify-center p-1.5 group-hover:border-green-400 transition-all duration-500 bg-green-400/5 backdrop-blur-sm group-hover:bg-green-400/10">
              <div className="w-1.5 h-3 bg-gradient-to-b from-green-400 to-green-300 rounded-full animate-scroll-down-slow group-hover:from-green-300 group-hover:to-green-200" />
            </div>
          </div>
          <ArrowDown className="h-5 w-5 text-green-400/60 animate-bounce-slow group-hover:text-green-400 transition-colors duration-500" />
        </div>
      </div>

      {/* Enhanced CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0) scale(1);
            opacity: 0.3;
          }
          33% {
            transform: translateY(-30px) translateX(20px) scale(1.1);
            opacity: 0.5;
          }
          66% {
            transform: translateY(-10px) translateX(-15px) scale(0.9);
            opacity: 0.4;
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }

        @keyframes scroll-down-slow {
          0% {
            transform: translateY(0);
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          80% {
            opacity: 1;
          }
          100% {
            transform: translateY(20px);
            opacity: 0;
          }
        }

        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-6px);
          }
        }

        @keyframes gradient-x {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes glow {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.6;
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes ping-slow {
          0% {
            transform: scale(1);
            opacity: 0.5;
          }
          50% {
            transform: scale(1.1);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 0;
          }
        }

        @keyframes pulse-slower {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.02);
          }
        }

        .animate-shimmer {
          animation: shimmer 3s linear infinite;
        }

        .animate-scroll-down-slow {
          animation: scroll-down-slow 3.5s ease-in-out infinite;
        }

        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }

        .animate-gradient-x {
          animation: gradient-x 8s ease infinite;
        }

        .animate-glow {
          animation: glow 3s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }

        .animate-ping-slow {
          animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }

        .animate-pulse-slower {
          animation: pulse-slower 4s ease-in-out infinite;
        }

        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </section>
  );
}