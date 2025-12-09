import React from 'react';
import { Link } from 'react-router-dom';

export default function FitnessLogo({ showText = true, size = "normal", className = "" }) {
  const sizes = {
    small: { svg: 40, text: "text-lg", subtext: "text-xs" },
    normal: { svg: 60, text: "text-2xl md:text-3xl", subtext: "text-xs md:text-sm" },
    large: { svg: 80, text: "text-3xl md:text-4xl", subtext: "text-sm md:text-base" }
  };
  
  const currentSize = sizes[size] || sizes.normal;
  
  const LogoContent = () => (
    <div className={`flex items-center gap-3 ${className} animate-fade-in`}>
      {/* Modern FitFlex Logo - Stylized F with vibrant gradient (No Circle) */}
      <div className="relative">
        <svg width={currentSize.svg} height={currentSize.svg} viewBox="0 0 60 60" className="transition-transform hover:scale-105">
          <defs>
            <linearGradient id={`logoGradient-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F97316">
                <animate attributeName="stop-color" values="#F97316;#EF4444;#F59E0B;#F97316" dur="3s" repeatCount="indefinite"/>
              </stop>
              <stop offset="50%" stopColor="#EF4444">
                <animate attributeName="stop-color" values="#EF4444;#F59E0B;#F97316;#EF4444" dur="3s" repeatCount="indefinite"/>
              </stop>
              <stop offset="100%" stopColor="#F59E0B">
                <animate attributeName="stop-color" values="#F59E0B;#F97316;#EF4444;#F59E0B" dur="3s" repeatCount="indefinite"/>
              </stop>
            </linearGradient>
            <linearGradient id={`logoGradient2-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#EF4444">
                <animate attributeName="stop-color" values="#EF4444;#F97316;#F59E0B;#EF4444" dur="3s" repeatCount="indefinite"/>
              </stop>
              <stop offset="100%" stopColor="#F97316">
                <animate attributeName="stop-color" values="#F97316;#F59E0B;#EF4444;#F97316" dur="3s" repeatCount="indefinite"/>
              </stop>
            </linearGradient>
            <filter id={`glow-${size}`}>
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Main F Shape - Bold, blocky design with gradient */}
          <path d="M12 10 L12 50 L18 50 L18 32 L28 32 L32 28 L32 24 L18 24 L18 20 L36 20 L36 14 L18 14 L18 10 Z" 
                fill={`url(#logoGradient-${size})`} 
                stroke="none"
                filter={`url(#glow-${size})`}/>
          
          {/* Inner F highlight for depth */}
          <path d="M14 12 L14 48 L16 48 L16 30 L26 30 L28 28 L28 26 L16 26 L16 22 L32 22 L32 16 L16 16 L16 12 Z" 
                fill={`url(#logoGradient2-${size})`} 
                opacity="0.6"
                filter={`url(#glow-${size})`}/>
        </svg>
      </div>
      
      {/* Text */}
      {showText && (
        <div className="flex flex-col">
          <span className={`${currentSize.text} font-bold bg-gradient-to-r from-orange-300 via-orange-400 to-red-500 bg-clip-text text-transparent animate-gradient-x tracking-tight`}>
            FITFLEX
          </span>
          <span className={`${currentSize.subtext} font-semibold bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 bg-clip-text text-transparent animate-gradient-x tracking-wider`}>
            ESTD 2000
          </span>
        </div>
      )}
    </div>
  );
  
  if (showText) {
    return (
      <Link to="/" className="hover:opacity-90 transition-opacity">
        <LogoContent />
      </Link>
    );
  }
  
  return <LogoContent />;
}
