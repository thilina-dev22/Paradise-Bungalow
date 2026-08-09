import React, { useState, useEffect } from 'react';
import { Calendar, Menu, X, Star, MessageSquare, Phone } from 'lucide-react';
import Logo from './Logo';
import { PROPERTY_DETAILS } from '../data/roomsData';

const NAV_LINKS = [
  { href: '#rooms', label: 'Rooms & Cabanas' },
  { href: '#amenities', label: 'Amenities' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#location', label: 'Location' },
  { href: '#reviews', label: 'Reviews' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar({ onOpenBooking }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg shadow-emerald-950/5 border-b border-stone-200/80 py-3'
          : 'bg-white border-b border-stone-200/60 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">

        {/* Logo — Left */}
        <a href="#" className="flex-shrink-0">
          <Logo variant="dark" />
        </a>

        {/* Desktop Nav — Center */}
        <nav className="hidden lg:flex items-center gap-7">
          {NAV_LINKS.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="whitespace-nowrap text-sm font-semibold text-stone-700 hover:text-emerald-900 transition-colors relative py-1 group"
            >
              {label}
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-400 to-amber-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-250 origin-left rounded-full" />
            </a>
          ))}
        </nav>

        {/* Desktop CTAs — Right */}
        <div className="hidden sm:flex items-center gap-3 flex-shrink-0">
          
          {/* Quick Rating Badge */}
          <div className="hidden xl:flex items-center gap-1.5 bg-amber-50 border border-amber-200/80 text-amber-800 px-3 py-1.5 rounded-full text-xs font-bold">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
            <span>9.6 / 10 Exceptional</span>
          </div>

          {/* Quick WhatsApp Contact Pill */}
          <a
            href={`https://wa.me/${PROPERTY_DETAILS.phoneClean}?text=Hello%20Paradise%20Bungalow,%20I%20want%20to%20inquire%20about%20rooms.`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-9 h-9 rounded-full bg-emerald-50 text-emerald-700 hover:bg-emerald-100 hover:text-emerald-900 transition-all border border-emerald-200/80"
            title="Chat on WhatsApp"
          >
            <MessageSquare className="w-4 h-4 text-emerald-600" />
          </a>

          {/* Primary Book Direct CTA */}
          <button
            onClick={onOpenBooking}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 hover:from-emerald-900 hover:to-emerald-800 transition-all shadow-md shadow-emerald-950/20 border border-amber-400/30 hover:border-amber-400 active:scale-95 whitespace-nowrap"
          >
            <Calendar className="w-3.5 h-3.5 text-amber-400" />
            Book Direct &amp; Save
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-xl text-emerald-950 hover:bg-stone-100 transition-colors"
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-stone-200/80 px-5 py-6 shadow-2xl animate-in slide-in-from-top-2 duration-200">
          
          <div className="flex items-center justify-between bg-amber-50 border border-amber-200/80 rounded-xl p-3 mb-4 text-xs">
            <span className="font-semibold text-amber-900">Rating 9.6 / 10 Exceptional</span>
            <span className="text-amber-700 font-medium">Midigama, Sri Lanka</span>
          </div>

          <nav className="flex flex-col gap-1 mb-5">
            {NAV_LINKS.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 rounded-xl text-sm font-semibold text-emerald-950 hover:bg-stone-50 hover:text-emerald-800 transition-colors"
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="flex flex-col gap-3 pt-4 border-t border-stone-200/80">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full text-sm font-bold text-emerald-950 bg-gradient-to-r from-amber-400 to-amber-500 shadow-lg shadow-amber-500/20 active:scale-95"
            >
              <Calendar className="w-4 h-4" />
              Book Direct / Inquire
            </button>

            <a
              href={`https://wa.me/${PROPERTY_DETAILS.phoneClean}?text=Hello%20Paradise%20Bungalow,%20I%20want%20to%20inquire%20about%20rooms.`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-full text-sm font-semibold text-stone-700 bg-stone-100 border border-stone-200 hover:bg-stone-200"
            >
              <MessageSquare className="w-4 h-4 text-emerald-600" />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
}