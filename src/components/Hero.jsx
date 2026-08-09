import React, { useState, useEffect } from 'react';
import { Calendar, CheckCircle2, MessageSquare, MapPin, ChevronDown, Star } from 'lucide-react';
import { PROPERTY_DETAILS } from '../data/roomsData';

const HERO_IMAGES = [
  '/images/general/IMG_8653.jpg',
  '/images/wooden-cabana/IMG_8703.jpg',
  '/images/general/IMG_8720.jpg',
  '/images/general/IMG_8685.jpg',
  '/images/general/IMG_8713_1.jpg'
];

export default function Hero({ onOpenBooking }) {
  const [currentBg, setCurrentBg] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center text-white overflow-hidden">
      {/* Background Image Slider */}
      {HERO_IMAGES.map((img, idx) => (
        <div
          key={img}
          className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out ${
            idx === currentBg ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.03]'
          }`}
          style={{ backgroundImage: `url(${img})` }}
        />
      ))}

      {/* Layered Overlays for cinematic depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/75 to-emerald-950/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/50 via-transparent to-emerald-950/20" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto text-center px-4 sm:px-6 pt-20 pb-24 sm:pt-24 sm:pb-36">

        {/* Rating + Location Badge Row */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-xs font-semibold text-white/90">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>9.6 / 10 Exceptional · Booking.com</span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-full bg-amber-500/15 backdrop-blur-sm border border-amber-400/30 text-xs font-semibold text-amber-300">
            <MapPin className="w-3.5 h-3.5" />
            <span>Midigama, Sri Lanka · 200 m to Beach</span>
          </div>
        </div>

        {/* Hero Heading */}
        <h1 className="font-serif font-extrabold tracking-tight leading-none mb-6">
          <span className="block text-2xl sm:text-5xl lg:text-6xl text-white/80 font-light italic mb-2 sm:mb-3">
            Experience Tranquility at
          </span>
          <span className="block text-4xl sm:text-7xl lg:text-8xl bg-gradient-to-r from-amber-200 via-amber-400 to-amber-300 bg-clip-text text-transparent drop-shadow-2xl">
            Paradise Bungalow
          </span>
        </h1>

        {/* Divider */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-amber-400/60" />
          <div className="w-1.5 h-1.5 rounded-full bg-amber-400/80" />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-amber-400/60" />
        </div>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-stone-300/90 font-light max-w-2xl mx-auto mb-10 leading-relaxed">
          A garden sanctuary in Midigama with{' '}
          <strong className="text-white font-semibold">10 unique rooms &amp; cabanas</strong> — 
          from rustic eco wooden stays to a 65 m² suite with private kitchen, steps from the surf.
        </p>

        {/* Feature Highlights */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs text-white/60 mb-12">
          {[
            { icon: CheckCircle2, text: 'Free Cancellation' },
            { icon: CheckCircle2, text: 'No Prepayment Needed' },
            { icon: CheckCircle2, text: '12% Genius Discount' },
          ].map(({ icon: Icon, text }, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <Icon className="w-3.5 h-3.5 text-emerald-400" />
              <span>{text}</span>
            </div>
          ))}
        </div>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5">
          <button
            onClick={onOpenBooking}
            className="w-full sm:w-auto px-8 py-4 rounded-full text-sm font-bold text-emerald-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 transition-all shadow-2xl shadow-amber-500/25 active:scale-95 flex items-center justify-center gap-2.5 tracking-wide"
          >
            <Calendar className="w-4.5 h-4.5" />
            Check Rates &amp; Availability
          </button>

          <a
            href="#rooms"
            className="w-full sm:w-auto px-8 py-4 rounded-full text-sm font-semibold text-white bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/25 transition-all shadow-lg flex items-center justify-center gap-2"
          >
            <span>Explore Rooms &amp; Cabanas</span>
            <ChevronDown className="w-4 h-4 text-amber-300" />
          </a>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 z-10">
        {HERO_IMAGES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentBg(idx)}
            className={`rounded-full transition-all duration-300 ${
              idx === currentBg ? 'w-8 h-1.5 bg-amber-400' : 'w-2 h-1.5 bg-white/30 hover:bg-white/60'
            }`}
            aria-label={`Slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-7 right-6 z-10 hidden sm:flex flex-col items-center gap-1 text-white/40 text-[10px] font-medium tracking-widest uppercase">
        <span>Scroll</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </div>
    </section>
  );
}
