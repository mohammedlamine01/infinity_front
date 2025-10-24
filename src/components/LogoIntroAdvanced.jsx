"use client";

import { useEffect, useState } from 'react';

export default function LogoIntroAdvanced({ onComplete, duration = 5000, aspectRatio = '16:9' }) {
  const [isVisible, setIsVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, duration - 500);

    const completeTimer = setTimeout(() => {
      setIsVisible(false);
      if (onComplete) onComplete();
    }, duration);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [duration, onComplete]);

  if (!isVisible) return null;

  const containerClass = aspectRatio === '1:1' ? 'aspect-square' : 'aspect-video';

  return (
    <div 
      className={`fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden transition-opacity duration-500 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}
    >
      {/* Cinematic gradient background */}
      <div className="absolute inset-0 bg-black">
        {/* Animated gradient layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-950 to-black"></div>
        <div className="absolute inset-0 cinematic-gradient"></div>
        
        {/* Particle effect background */}
        <div className="absolute inset-0 particles-container">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${5 + Math.random() * 10}s`,
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Main content container */}
      <div className={`relative ${containerClass} max-w-6xl w-full px-8`}>
        {/* Outer glow rings - multiple layers */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute w-[800px] h-[800px] glow-ring-1"></div>
          <div className="absolute w-[600px] h-[600px] glow-ring-2"></div>
          <div className="absolute w-[450px] h-[450px] glow-ring-3"></div>
          <div className="absolute w-[350px] h-[350px] glow-ring-4"></div>
        </div>

        {/* 3D Logo container */}
        <div className="relative flex items-center justify-center h-full">
          <div className="logo-stage">
            <div className="logo-3d-wrapper">
              {/* Logo with 3D transformation */}
              <div className="logo-3d-card">
                {/* Back face */}
                <div className="logo-face logo-face-back">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full blur-2xl"></div>
                </div>

                {/* Front face */}
                <div className="logo-face logo-face-front">
                  {/* Main logo container */}
                  <div className="relative logo-content">
                    {/* Shadow layers for depth */}
                    <div className="absolute inset-0 logo-depth-shadow-1"></div>
                    <div className="absolute inset-0 logo-depth-shadow-2"></div>
                    <div className="absolute inset-0 logo-depth-shadow-3"></div>

                    {/* Logo SVG or Image */}
                    <div className="relative z-10 w-80 h-80 logo-image-container">
                      <svg
                        viewBox="0 0 200 200"
                        className="w-full h-full logo-svg"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <defs>
                          {/* Gradient definitions */}
                          <radialGradient id="logoGradient" cx="50%" cy="50%">
                            <stop offset="0%" stopColor="oklch(0.7273 0.2700 149.2005)" stopOpacity="1" />
                            <stop offset="50%" stopColor="oklch(0.6273 0.1700 149.2005)" stopOpacity="0.9" />
                            <stop offset="100%" stopColor="oklch(0.5273 0.1200 149.2005)" stopOpacity="0.7" />
                          </radialGradient>

                          {/* Glow filter */}
                          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                            <feMerge>
                              <feMergeNode in="coloredBlur"/>
                              <feMergeNode in="SourceGraphic"/>
                            </feMerge>
                          </filter>

                          {/* Metallic shine */}
                          <linearGradient id="shine" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
                            <stop offset="50%" stopColor="rgba(255,255,255,0.8)" />
                            <stop offset="100%" stopColor="rgba(255,255,255,0.2)" />
                          </linearGradient>
                        </defs>

                        {/* Infinity symbol or custom logo */}
                        <g filter="url(#glow)" className="logo-shape">
                          {/* Infinity symbol made of circles */}
                          <circle cx="70" cy="100" r="40" fill="url(#logoGradient)" className="logo-circle-left" />
                          <circle cx="130" cy="100" r="40" fill="url(#logoGradient)" className="logo-circle-right" />
                          <path
                            d="M 70 60 Q 100 100 130 60 Q 100 100 70 60 Z M 70 140 Q 100 100 130 140 Q 100 100 70 140 Z"
                            fill="url(#logoGradient)"
                            className="logo-connection"
                          />
                        </g>

                        {/* Metallic shine overlay */}
                        <rect width="200" height="200" fill="url(#shine)" opacity="0.3" className="logo-shine-rect" />
                      </svg>

                      {/* Neon aura effect */}
                      <div className="absolute inset-0 logo-neon-aura"></div>
                    </div>

                    {/* Cinematic light rays */}
                    <div className="absolute inset-0 light-rays">
                      <div className="light-ray light-ray-1"></div>
                      <div className="light-ray light-ray-2"></div>
                      <div className="light-ray light-ray-3"></div>
                    </div>

                    {/* Surface reflections */}
                    <div className="absolute inset-0 surface-reflection"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom illumination */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
          <div className="w-[500px] h-40 bg-primary/40 blur-3xl rounded-full ground-glow"></div>
        </div>
      </div>

      <style jsx>{`
        /* Cinematic gradient background */
        .cinematic-gradient {
          background: radial-gradient(
            ellipse at center,
            rgba(99, 183, 123, 0.15) 0%,
            transparent 60%
          );
          animation: breathe 6s ease-in-out infinite;
        }

        @keyframes breathe {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.1); }
        }

        /* Floating particles */
        .particle {
          position: absolute;
          width: 2px;
          height: 2px;
          background: rgba(99, 183, 123, 0.6);
          border-radius: 50%;
          animation: float linear infinite;
          box-shadow: 0 0 10px rgba(99, 183, 123, 0.8);
        }

        @keyframes float {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) translateX(50px);
            opacity: 0;
          }
        }

        /* Glow rings */
        .glow-ring-1 {
          background: radial-gradient(circle, rgba(99, 183, 123, 0.1) 0%, transparent 70%);
          border-radius: 50%;
          animation: pulse-ring 6s ease-in-out infinite;
        }

        .glow-ring-2 {
          background: radial-gradient(circle, rgba(99, 183, 123, 0.15) 0%, transparent 70%);
          border-radius: 50%;
          animation: pulse-ring 5s ease-in-out infinite 0.5s;
        }

        .glow-ring-3 {
          background: radial-gradient(circle, rgba(99, 183, 123, 0.2) 0%, transparent 70%);
          border-radius: 50%;
          animation: pulse-ring 4s ease-in-out infinite 1s;
        }

        .glow-ring-4 {
          background: radial-gradient(circle, rgba(99, 183, 123, 0.25) 0%, transparent 70%);
          border-radius: 50%;
          animation: pulse-ring 3s ease-in-out infinite 1.5s;
        }

        @keyframes pulse-ring {
          0%, 100% {
            transform: scale(1);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.6;
          }
        }

        /* 3D Stage setup */
        .logo-stage {
          perspective: 1200px;
          transform-style: preserve-3d;
        }

        .logo-3d-wrapper {
          transform-style: preserve-3d;
          animation: rotate3D 5s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite;
        }

        @keyframes rotate3D {
          0% {
            transform: rotateY(0deg) rotateX(0deg) rotateZ(0deg);
          }
          25% {
            transform: rotateY(90deg) rotateX(10deg) rotateZ(5deg);
          }
          50% {
            transform: rotateY(180deg) rotateX(0deg) rotateZ(0deg);
          }
          75% {
            transform: rotateY(270deg) rotateX(-10deg) rotateZ(-5deg);
          }
          100% {
            transform: rotateY(360deg) rotateX(0deg) rotateZ(0deg);
          }
        }

        /* 3D Card faces */
        .logo-3d-card {
          position: relative;
          width: 320px;
          height: 320px;
          transform-style: preserve-3d;
        }

        .logo-face {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .logo-face-front {
          transform: translateZ(40px);
        }

        .logo-face-back {
          transform: translateZ(-40px) rotateY(180deg);
        }

        /* Depth shadows */
        .logo-depth-shadow-1 {
          transform: translateZ(-10px);
          filter: blur(30px);
          background: radial-gradient(circle, rgba(0,0,0,0.8) 0%, transparent 70%);
          opacity: 0.6;
        }

        .logo-depth-shadow-2 {
          transform: translateZ(-20px);
          filter: blur(40px);
          background: radial-gradient(circle, rgba(0,0,0,0.6) 0%, transparent 70%);
          opacity: 0.4;
        }

        .logo-depth-shadow-3 {
          transform: translateZ(-30px);
          filter: blur(50px);
          background: radial-gradient(circle, rgba(0,0,0,0.4) 0%, transparent 70%);
          opacity: 0.2;
        }

        /* Logo SVG animations */
        .logo-svg {
          filter: drop-shadow(0 0 20px rgba(99, 183, 123, 0.9))
                  drop-shadow(0 0 40px rgba(99, 183, 123, 0.6))
                  drop-shadow(0 0 60px rgba(99, 183, 123, 0.4));
          animation: svg-glow 2s ease-in-out infinite;
        }

        @keyframes svg-glow {
          0%, 100% {
            filter: drop-shadow(0 0 20px rgba(99, 183, 123, 0.9))
                    drop-shadow(0 0 40px rgba(99, 183, 123, 0.6));
          }
          50% {
            filter: drop-shadow(0 0 30px rgba(99, 183, 123, 1))
                    drop-shadow(0 0 60px rgba(99, 183, 123, 0.8))
                    drop-shadow(0 0 90px rgba(99, 183, 123, 0.6));
          }
        }

        .logo-circle-left,
        .logo-circle-right,
        .logo-connection {
          animation: shape-pulse 3s ease-in-out infinite;
        }

        @keyframes shape-pulse {
          0%, 100% {
            opacity: 0.9;
          }
          50% {
            opacity: 1;
          }
        }

        .logo-shine-rect {
          animation: shine-move 4s linear infinite;
          mix-blend-mode: overlay;
        }

        @keyframes shine-move {
          0% {
            transform: translateX(-200px) translateY(-200px);
          }
          100% {
            transform: translateX(200px) translateY(200px);
          }
        }

        /* Neon aura */
        .logo-neon-aura {
          background: radial-gradient(
            circle at center,
            rgba(99, 183, 123, 0.6) 0%,
            rgba(99, 183, 123, 0.3) 30%,
            rgba(99, 183, 123, 0.1) 60%,
            transparent 80%
          );
          filter: blur(30px);
          animation: aura-pulse 2s ease-in-out infinite;
          mix-blend-mode: screen;
        }

        @keyframes aura-pulse {
          0%, 100% {
            opacity: 0.7;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.15);
          }
        }

        /* Cinematic light rays */
        .light-ray {
          position: absolute;
          width: 2px;
          height: 100%;
          background: linear-gradient(
            to bottom,
            transparent 0%,
            rgba(99, 183, 123, 0.4) 50%,
            transparent 100%
          );
          opacity: 0.5;
          mix-blend-mode: screen;
        }

        .light-ray-1 {
          left: 30%;
          animation: ray-sweep 5s ease-in-out infinite;
        }

        .light-ray-2 {
          left: 50%;
          animation: ray-sweep 5s ease-in-out infinite 1s;
        }

        .light-ray-3 {
          left: 70%;
          animation: ray-sweep 5s ease-in-out infinite 2s;
        }

        @keyframes ray-sweep {
          0%, 100% {
            transform: translateX(-100px) scaleY(0.5);
            opacity: 0;
          }
          50% {
            transform: translateX(100px) scaleY(1);
            opacity: 0.6;
          }
        }

        /* Surface reflection */
        .surface-reflection {
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.3) 0%,
            transparent 30%,
            transparent 70%,
            rgba(255, 255, 255, 0.2) 100%
          );
          animation: reflection-shift 4s ease-in-out infinite;
          mix-blend-mode: overlay;
          pointer-events: none;
        }

        @keyframes reflection-shift {
          0%, 100% {
            opacity: 0.4;
            transform: rotate(0deg);
          }
          50% {
            opacity: 0.7;
            transform: rotate(5deg);
          }
        }

        /* Ground glow */
        .ground-glow {
          animation: ground-pulse 3s ease-in-out infinite;
        }

        @keyframes ground-pulse {
          0%, 100% {
            opacity: 0.4;
            transform: scaleX(1);
          }
          50% {
            opacity: 0.7;
            transform: scaleX(1.1);
          }
        }
      `}</style>
    </div>
  );
}
