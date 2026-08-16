import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Calendar, Sparkles, Star } from 'lucide-react';
import Logo from './Logo';
import { PROPERTY_DETAILS } from '../data/roomsData';
import { HMS_CONFIG } from '../services/hmsApi';

export default function Navbar({ onOpenBooking }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Rooms & Cabanas', href: '#rooms' },
    { name: 'Amenities', href: '#amenities' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Location', href: '#location' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-emerald-950/95 backdrop-blur-md py-3 shadow-lg shadow-emerald-950/20 border-b border-emerald-900/60'
          : 'bg-gradient-to-b from-emerald-950/90 via-emerald-950/50 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        
        {/* Logo */}
        <Logo variant="light" />

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-7 text-xs font-semibold tracking-wide text-white/90">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="hover:text-amber-400 transition-colors uppercase tracking-wider"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href={`tel:${PROPERTY_DETAILS.phoneClean}`}
            className="flex items-center gap-1.5 text-xs text-stone-200 hover:text-amber-400 transition-colors px-3 py-2"
          >
            <Phone className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-semibold">{PROPERTY_DETAILS.phone}</span>
          </a>

          <button
            onClick={() => onOpenBooking()}
            className="px-5 py-2.5 rounded-full text-xs font-bold text-emerald-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 transition-all shadow-md shadow-amber-500/20 flex items-center gap-1.5 active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5 fill-emerald-950" />
            <span>Book Direct</span>
          </button>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-white p-2 focus:outline-none"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="lg:hidden bg-emerald-950 border-b border-emerald-900 px-6 py-6 space-y-4 animate-fade-in text-center">
          <div className="space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block text-sm font-semibold text-white/90 hover:text-amber-400 transition-colors py-1.5"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-4 border-t border-emerald-900 space-y-3">
            <button
              onClick={() => {
                setIsOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3 rounded-full text-xs font-bold text-emerald-950 bg-amber-400 hover:bg-amber-300 transition-colors flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Direct (0% Fees)</span>
            </button>
            <a
              href={`tel:${PROPERTY_DETAILS.phoneClean}`}
              className="inline-flex items-center gap-2 text-xs text-stone-300 hover:text-amber-400"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>{PROPERTY_DETAILS.phone}</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
