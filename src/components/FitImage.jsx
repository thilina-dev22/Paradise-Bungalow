import React from 'react';

// Shows the whole photo (never cropped). Any leftover space is filled with a blurred copy of the same photo.
export default function FitImage({ src, alt, className = '', imgClassName = '', priority = false }) {
  return (
    <div className={`relative overflow-hidden bg-emerald-950 ${className}`}>
      <img
        src={src}
        alt=""
        aria-hidden="true"
        loading={priority ? 'eager' : 'lazy'}
        className="absolute inset-0 h-full w-full scale-125 object-cover opacity-70 blur-2xl"
      />
      <img
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        className={`relative h-full w-full object-contain ${imgClassName}`}
      />
    </div>
  );
}
