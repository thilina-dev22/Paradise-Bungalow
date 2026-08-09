import React from 'react';

export default function Logo({ variant = 'dark', size = 'normal' }) {
  const isLightText = variant === 'light';

  return (
    <div className="flex items-center gap-3 group cursor-pointer select-none">
      {/* SVG Emblem Seal */}
      <div className={`relative flex items-center justify-center rounded-2xl p-2 transition-transform duration-300 group-hover:scale-105 ${
        isLightText 
          ? 'bg-emerald-950 border border-amber-400/40 shadow-lg shadow-emerald-950/40' 
          : 'bg-gradient-to-br from-emerald-900 to-emerald-950 border border-amber-500/30 shadow-md shadow-emerald-900/20'
      } ${size === 'large' ? 'w-14 h-14' : 'w-11 h-11'}`}>
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full text-amber-400 drop-shadow-sm"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Outer Crest Ring */}
          <circle cx="50" cy="50" r="44" stroke="#d9a04a" strokeWidth="2.5" strokeDasharray="6 3" opacity="0.6" />
          <circle cx="50" cy="50" r="40" stroke="#f5cf89" strokeWidth="1.5" opacity="0.8" />
          
          {/* Bungalow Roof Line */}
          <path d="M 22 52 L 50 24 L 78 52" stroke="#f5cf89" strokeWidth="4.5" fill="none" />
          <path d="M 32 46 L 50 28 L 68 46" stroke="#d9a04a" strokeWidth="2" fill="none" opacity="0.7" />
          
          {/* Sun Rising behind Roof */}
          <circle cx="50" cy="38" r="7" fill="#f5cf89" opacity="0.9" />

          {/* Tropical Palm Fronds Left & Right */}
          <path d="M 28 68 Q 40 56 50 64 Q 60 56 72 68" stroke="#f5cf89" strokeWidth="3" fill="none" />
          <path d="M 34 76 Q 44 68 50 72 Q 56 68 66 76" stroke="#d9a04a" strokeWidth="2.5" fill="none" opacity="0.8" />

          {/* Base Pillars */}
          <line x1="32" y1="52" x2="32" y2="76" stroke="#f5cf89" strokeWidth="3" />
          <line x1="68" y1="52" x2="68" y2="76" stroke="#f5cf89" strokeWidth="3" />
          <line x1="50" y1="58" x2="50" y2="76" stroke="#d9a04a" strokeWidth="2" />
        </svg>
      </div>

      {/* Typography */}
      <div className="flex flex-col">
        <span className={`font-serif font-bold tracking-tight leading-none ${
          size === 'large' ? 'text-2xl md:text-3xl' : 'text-xl'
        } ${isLightText ? 'text-white' : 'text-emerald-950'}`}>
          Paradise Bungalow
        </span>
        <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.2em] uppercase text-amber-600 mt-1 flex items-center gap-1.5">
          <span>Garden Sanctuary</span>
          <span className="w-1 h-1 rounded-full bg-amber-500 inline-block"></span>
          <span>Midigama</span>
        </span>
      </div>
    </div>
  );
}
