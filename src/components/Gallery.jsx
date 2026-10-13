import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Camera, X, ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { GALLERY_CATEGORIES, ALL_GALLERY_ITEMS } from '../data/galleryData';

const PAGE_SIZE = 16;

export default function Gallery() {
  const [filter, setFilter] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const touchStartX = useRef(null);

  const filteredItems = filter === 'all'
    ? ALL_GALLERY_ITEMS
    : ALL_GALLERY_ITEMS.filter((item) => item.category === filter);

  const displayedItems = filteredItems.slice(0, visibleCount);

  const handleFilterChange = (catId) => {
    setFilter(catId);
    setVisibleCount(PAGE_SIZE);
  };

  // The lightbox walks through every photo in the current filter, not just the ones loaded on the page.
  const step = useCallback(
    (delta) => setLightboxIndex((i) => (i + delta + filteredItems.length) % filteredItems.length),
    [filteredItems.length]
  );

  useEffect(() => {
    if (lightboxIndex === null) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowLeft') step(-1);
      if (e.key === 'ArrowRight') step(1);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [lightboxIndex, step]);

  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
  };

  const current = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  return (
    <section id="gallery" className="py-16 sm:py-24 bg-stone-100/70 border-t border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/15 text-amber-800 text-xs font-bold uppercase tracking-wider mb-3 border border-amber-500/30">
            <Camera className="w-3.5 h-3.5" /> {ALL_GALLERY_ITEMS.length} Photos
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-semibold text-emerald-950 mb-3">
            Explore Paradise Bungalow
          </h2>
          <p className="text-sm sm:text-base text-stone-600">
            Take a visual tour of the gardens and every room, in full, uncropped.
          </p>
        </div>

        {/* Filter tabs: one scrollable row on phones, wrapped on larger screens */}
        <div className="-mx-4 sm:mx-0 mb-8 sm:mb-10">
          <div className="flex sm:flex-wrap sm:justify-center gap-2 overflow-x-auto no-scrollbar px-4 sm:px-0 snap-x">
            {GALLERY_CATEGORIES.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleFilterChange(tab.id)}
                className={`snap-start shrink-0 px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                  filter === tab.id
                    ? 'bg-emerald-900 text-white shadow-md shadow-emerald-900/20'
                    : 'bg-white text-emerald-950 border border-stone-300 hover:border-emerald-900/30'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry: every photo keeps its own proportions, so nothing is cropped */}
        <div className="columns-2 sm:columns-3 lg:columns-4 gap-2.5 sm:gap-4">
          {displayedItems.map((item, idx) => (
            <button
              key={item.src}
              onClick={() => setLightboxIndex(idx)}
              className="relative block w-full mb-2.5 sm:mb-4 break-inside-avoid rounded-xl sm:rounded-2xl overflow-hidden group shadow-md hover:shadow-xl transition-shadow duration-300 bg-stone-200"
              aria-label={`Open photo: ${item.title}`}
            >
              <img
                src={item.src}
                alt={item.title}
                width={item.width}
                height={item.height}
                loading="lazy"
                decoding="async"
                className="w-full h-auto group-hover:scale-[1.03] transition-transform duration-500"
              />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-emerald-950/80 to-transparent p-3 text-left text-xs font-semibold text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:block">
                {item.title}
              </span>
            </button>
          ))}
        </div>

        {visibleCount < filteredItems.length && (
          <div className="text-center mt-8 sm:mt-10">
            <button
              onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold text-emerald-950 bg-amber-400 hover:bg-amber-300 shadow-md hover:shadow-lg active:scale-95"
            >
              <Plus className="w-4 h-4" /> Load More ({filteredItems.length - visibleCount} remaining)
            </button>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {current && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={() => setLightboxIndex(null)}
          onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
          onTouchEnd={onTouchEnd}
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
        >
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-3 right-3 sm:top-6 sm:right-6 bg-white/15 hover:bg-white/30 text-white rounded-full w-11 h-11 flex items-center justify-center z-10"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); step(-1); }}
            className="absolute left-2 sm:left-8 bg-white/15 hover:bg-white/30 text-white rounded-full w-11 h-11 flex items-center justify-center z-10"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <figure className="max-w-5xl w-full px-14 sm:px-20 text-center" onClick={(e) => e.stopPropagation()}>
            <img
              src={current.src}
              alt={current.title}
              className="mx-auto max-w-full max-h-[78vh] rounded-xl object-contain shadow-2xl"
            />
            <figcaption className="text-amber-300 mt-3 text-sm sm:text-base font-semibold">
              {current.title} · {lightboxIndex + 1} / {filteredItems.length}
            </figcaption>
          </figure>

          <button
            onClick={(e) => { e.stopPropagation(); step(1); }}
            className="absolute right-2 sm:right-8 bg-white/15 hover:bg-white/30 text-white rounded-full w-11 h-11 flex items-center justify-center z-10"
            aria-label="Next photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </section>
  );
}
