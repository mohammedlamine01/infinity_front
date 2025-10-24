"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function LogoIntro({ onComplete, duration = 5000 }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onComplete) {
        setTimeout(onComplete, 500); // Wait for fade out
      }
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center logo-intro-container">
      {/* Dark gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-radial from-primary/20 via-transparent to-transparent animate-pulse-slow"></div>
      </div>

      {/* Main logo container */}
      <div className="relative z-10 logo-wrapper">
        {/* Outer glow rings */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl animate-ping-slow"></div>
          <div className="absolute w-[500px] h-[500px] rounded-full bg-primary/10 blur-2xl animate-pulse-slow"></div>
          <div className="absolute w-[400px] h-[400px] rounded-full bg-primary/15 blur-xl"></div>
        </div>

        {/* Logo container with 3D rotation */}
        <div className="relative logo-3d-container">
          {/* Back shadow/depth layer */}
          <div className="absolute inset-0 logo-shadow"></div>
          
          {/* Main logo with effects */}
          <div className="relative logo-main">
            {/* Metallic sheen overlay */}
            <div className="absolute inset-0 logo-sheen"></div>
            
            {/* Logo image */}
            <div className="relative w-64 h-64 logo-image-wrapper">
              <Image
                src="/assest/ChatGPT Image 23 oct. 2025, 11_35_49.png"
                alt="Logo"
                width={256}
                height={256}
                className="w-full h-full object-contain logo-image"
                priority
              />
              
              {/* Neon glow effect */}
              <div className="absolute inset-0 logo-neon-glow"></div>
            </div>

            {/* Light reflections */}
            <div className="absolute top-0 left-0 w-full h-full logo-reflection"></div>
          </div>

          {/* Front highlight */}
          <div className="absolute inset-0 logo-highlight"></div>
        </div>

        {/* Bottom glow */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-96 h-32 bg-primary/30 blur-3xl rounded-full"></div>
      </div>

      <style jsx>{`
        /* Container animations */
        .logo-intro-container {
          animation: fadeIn 0.5s ease-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        /* 3D rotation and perspective */
        .logo-wrapper {
          perspective: 1000px;
          transform-style: preserve-3d;
        }

        .logo-3d-container {
          width: 256px;
          height: 256px;
          transform-style: preserve-3d;
          animation: rotate3D 5s ease-in-out infinite;
        }

        @keyframes rotate3D {
          0% {
            transform: rotateY(0deg) rotateX(0deg);
          }
          25% {
            transform: rotateY(90deg) rotateX(5deg);
          }
          50% {
            transform: rotateY(180deg) rotateX(0deg);
          }
          75% {
            transform: rotateY(270deg) rotateX(-5deg);
          }
          100% {
            transform: rotateY(360deg) rotateX(0deg);
          }
        }

        /* Shadow depth effect */
        .logo-shadow {
          transform: translateZ(-20px);
          filter: blur(30px) brightness(0.3);
          opacity: 0.6;
          animation: shadowPulse 5s ease-in-out infinite;
        }

        @keyframes shadowPulse {
          0%, 100% {
            transform: translateZ(-20px) scale(1);
            opacity: 0.6;
          }
          50% {
            transform: translateZ(-25px) scale(1.1);
            opacity: 0.8;
          }
        }

        /* Metallic sheen */
        .logo-sheen {
          background: linear-gradient(
            135deg,
            transparent 0%,
            rgba(255, 255, 255, 0.1) 45%,
            rgba(255, 255, 255, 0.3) 50%,
            rgba(255, 255, 255, 0.1) 55%,
            transparent 100%
          );
          animation: sheenMove 3s ease-in-out infinite;
          pointer-events: none;
        }

        @keyframes sheenMove {
          0% {
            transform: translateX(-100%) translateY(-100%) rotate(45deg);
          }
          50% {
            transform: translateX(100%) translateY(100%) rotate(45deg);
          }
          100% {
            transform: translateX(-100%) translateY(-100%) rotate(45deg);
          }
        }

        /* Neon glow effect */
        .logo-neon-glow {
          background: radial-gradient(
            circle at center,
            rgba(var(--primary-rgb, 99, 183, 123), 0.8) 0%,
            rgba(var(--primary-rgb, 99, 183, 123), 0.4) 30%,
            transparent 70%
          );
          filter: blur(20px);
          animation: neonPulse 2s ease-in-out infinite;
          mix-blend-mode: screen;
        }

        @keyframes neonPulse {
          0%, 100% {
            opacity: 0.6;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.1);
          }
        }

        /* Light reflection */
        .logo-reflection {
          background: linear-gradient(
            to bottom right,
            rgba(255, 255, 255, 0.3) 0%,
            transparent 40%,
            transparent 60%,
            rgba(255, 255, 255, 0.1) 100%
          );
          animation: reflectionShift 4s ease-in-out infinite;
          mix-blend-mode: overlay;
          pointer-events: none;
        }

        @keyframes reflectionShift {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.7;
          }
        }

        /* Front highlight */
        .logo-highlight {
          background: radial-gradient(
            circle at 30% 30%,
            rgba(255, 255, 255, 0.4) 0%,
            rgba(255, 255, 255, 0.1) 20%,
            transparent 50%
          );
          animation: highlightMove 3s ease-in-out infinite;
          mix-blend-mode: overlay;
          pointer-events: none;
        }

        @keyframes highlightMove {
          0%, 100% {
            transform: translate(0, 0);
            opacity: 0.5;
          }
          50% {
            transform: translate(10px, 10px);
            opacity: 0.8;
          }
        }

        /* Logo image effects */
        .logo-image {
          filter: drop-shadow(0 0 20px rgba(var(--primary-rgb, 99, 183, 123), 0.8))
                  drop-shadow(0 0 40px rgba(var(--primary-rgb, 99, 183, 123), 0.6))
                  drop-shadow(0 0 60px rgba(var(--primary-rgb, 99, 183, 123), 0.4));
          animation: logoGlow 2s ease-in-out infinite, logoRotate 4s linear infinite;
        }

        @keyframes logoGlow {
          0%, 100% {
            filter: drop-shadow(0 0 20px rgba(var(--primary-rgb, 99, 183, 123), 0.8))
                    drop-shadow(0 0 40px rgba(var(--primary-rgb, 99, 183, 123), 0.6))
                    drop-shadow(0 0 60px rgba(var(--primary-rgb, 99, 183, 123), 0.4));
          }
          50% {
            filter: drop-shadow(0 0 30px rgba(var(--primary-rgb, 99, 183, 123), 1))
                    drop-shadow(0 0 60px rgba(var(--primary-rgb, 99, 183, 123), 0.8))
                    drop-shadow(0 0 90px rgba(var(--primary-rgb, 99, 183, 123), 0.6));
          }
        }

        @keyframes logoRotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        /* Slow animations for background */
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.5;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        @keyframes ping-slow {
          0% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.1;
            transform: scale(1.3);
          }
          100% {
            opacity: 0.3;
            transform: scale(1);
          }
        }

        .animate-ping-slow {
          animation: ping-slow 6s ease-in-out infinite;
        }

        /* Radial gradient utility */
        .bg-gradient-radial {
          background: radial-gradient(circle at center, var(--tw-gradient-stops));
        }
      `}</style>
    </div>
  );
}
