import React from 'react';

export default function Logo({ variant = 'dark', size = 'normal' }) {
  const isLightText = variant === 'light';

  return (
    <div className="flex items-center gap-3 group cursor-pointer select-none">
      {/* Concept 1 Luxury Circular Emblem */}
      <div className={`relative flex items-center justify-center rounded-2xl overflow-hidden transition-transform duration-300 group-hover:scale-105 ${
        isLightText 
          ? 'bg-emerald-950 border border-amber-400/50 shadow-lg shadow-emerald-950/40' 
          : 'bg-emerald-950 border border-amber-500/40 shadow-md shadow-emerald-950/15'
      } ${size === 'large' ? 'w-12 h-12 p-0.5' : 'w-10 h-10 p-0.5'}`}>
        <img
          src="/images/logo.png"
          alt="Paradise Bungalow Logo"
          className="w-full h-full object-cover rounded-xl"
        />
      </div>

      {/* Typography */}
      <div className="flex flex-col">
        <span className={`font-serif font-bold tracking-tight leading-none ${
          size === 'large' ? 'text-2xl md:text-3xl' : 'text-xl'
        } ${isLightText ? 'text-white' : 'text-emerald-950'}`}>
          Paradise Bungalow
        </span>
        <span className={`text-[10px] font-bold tracking-[0.18em] uppercase mt-0.5 ${
          isLightText ? 'text-amber-400/80' : 'text-amber-600'
        }`}>
          Midigama · Sri Lanka
        </span>
      </div>
    </div>
  );
}
