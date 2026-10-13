import React, { useState, useEffect } from 'react';
import { thumbOf } from '../utils/images';
import { Calendar, CheckCircle2, ChevronDown, Waves } from 'lucide-react';

const HERO_IMAGES = [
  '/images/general/8.webp',
  '/images/general/11.webp',
  '/images/general/15.webp',
  '/images/general/9.webp',
  '/images/general/14.webp'
];

const HIGHLIGHTS = ['Free cancellation', 'No prepayment needed', 'Best rate when you book direct'];

export default function Hero({ onOpenBooking }) {
  const [currentBg, setCurrentBg] = useState(0);
  // Slides 2 to 5 are mounted only after the page has loaded, so they never compete with the first photo.
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const start = () => setTimeout(() => setShowAll(true), 1200);
    if (document.readyState === 'complete') {
      const t = start();
      return () => clearTimeout(t);
    }
    let t;
    const onLoad = () => { t = start(); };
    window.addEventListener('load', onLoad, { once: true });
    return () => { window.removeEventListener('load', onLoad); clearTimeout(t); };
  }, []);

  useEffect(() => {
    if (!showAll) return undefined;
    const timer = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [showAll]);

  return (
    <section
      id="top"
      className="relative min-h-[100svh] flex items-center justify-center text-white overflow-hidden"
    >
      {/* Background slideshow */}
      {HERO_IMAGES.map((img, idx) => (idx === 0 || showAll || idx === currentBg) && (
        <img
          key={img}
          src={img}
          srcSet={`${thumbOf(img)} 800w, ${img} 1536w`}
          sizes="100vw"
          alt=""
          aria-hidden="true"
          fetchPriority={idx === 0 ? 'high' : 'auto'}
          className={`absolute inset-0 h-full w-full object-cover transition-all duration-[1400ms] ease-in-out ${
            idx === currentBg ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
          }`}
        />
      ))}

      {/* Neutral dark overlay (no green tint): darker at the bottom for legible text, light at the top so the photo shows */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/30" />
      {/* Soft dark pool behind the text so it stays readable on bright or busy photos */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_50%,rgba(0,0,0,0.5),transparent)]" />

      <div className="relative z-10 w-full max-w-4xl mx-auto text-center px-5 sm:px-6 pt-28 pb-28 sm:pt-32 sm:pb-36 [text-shadow:0_2px_14px_rgba(0,0,0,0.6)]">
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6 sm:mb-8">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-amber-300/40 text-[11px] sm:text-xs font-semibold text-amber-200">
            <Waves className="w-3.5 h-3.5" />
            50 m from Midigama beach
          </span>
        </div>

        <h1 className="font-serif leading-[1.02] mb-5 sm:mb-6">
          <span className="block text-lg sm:text-2xl italic font-normal text-white/90 mb-2 sm:mb-3">
            Experience tranquility at
          </span>
          <span className="block text-[2.6rem] sm:text-7xl lg:text-8xl font-semibold text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.35)]">
            Paradise <span className="text-amber-300">Bungalow</span>
          </span>
        </h1>

        <p className="text-[15px] sm:text-lg text-white font-normal max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed">
          A quiet garden sanctuary in Midigama with{' '}
          <strong className="text-white font-semibold">7 rooms &amp; a wooden cabana</strong>, steps from
          the famous Lazy Right surf break.
        </p>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 max-w-md sm:max-w-none mx-auto">
          <button
            onClick={() => onOpenBooking()}
            className="px-8 py-4 rounded-full text-sm font-bold text-emerald-950 bg-gradient-to-r from-amber-300 to-amber-400 hover:from-amber-200 hover:to-amber-300 shadow-2xl shadow-amber-500/25 active:scale-95 flex items-center justify-center gap-2.5"
          >
            <Calendar className="w-4 h-4" />
            Check Rates &amp; Book Direct
          </button>
          <a
            href="#rooms"
            className="px-8 py-4 rounded-full text-sm font-semibold text-white bg-black/35 hover:bg-black/50 backdrop-blur-md border border-white/40 flex items-center justify-center gap-2"
          >
            Explore Rooms
            <ChevronDown className="w-4 h-4 text-amber-300" />
          </a>
        </div>

        <ul className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[11px] sm:text-xs font-medium text-white/90">
          {HIGHLIGHTS.map((text) => (
            <li key={text} className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-300" />
              {text}
            </li>
          ))}
        </ul>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-10">
        {HERO_IMAGES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentBg(idx)}
            className="p-3"
            aria-label={`Show photo ${idx + 1}`}
          >
            <span
              className={`block rounded-full transition-all duration-300 h-1.5 ${
                idx === currentBg ? 'w-8 bg-amber-300' : 'w-2 bg-white/40'
              }`}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
