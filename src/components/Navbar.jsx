import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Calendar, Menu, X, Star, MessageSquare } from 'lucide-react';
import Logo from './Logo';
import { PROPERTY_DETAILS } from '../data/roomsData';

export default function Navbar({ onOpenBooking }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Utility Top Announcement Bar */}
      <div className="bg-emerald-950 text-emerald-100 text-xs py-2 px-4 border-b border-emerald-800/40">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4 sm:gap-6">
            <a 
              href={`tel:${PROPERTY_DETAILS.phoneClean}`} 
              className="flex items-center gap-1.5 hover:text-amber-400 transition-colors font-medium"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>{PROPERTY_DETAILS.phone}</span>
            </a>
            <a 
              href={`mailto:${PROPERTY_DETAILS.email}`} 
              className="hidden sm:flex items-center gap-1.5 hover:text-amber-400 transition-colors font-medium"
            >
              <Mail className="w-3.5 h-3.5 text-amber-400" />
              <span>{PROPERTY_DETAILS.email}</span>
            </a>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1 bg-amber-500/15 border border-amber-500/30 text-amber-300 px-2.5 py-0.5 rounded-full font-semibold text-[11px]">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              {PROPERTY_DETAILS.rating} / 10 Exceptional
            </span>
            <span className="text-emerald-300 font-medium hidden md:inline">
              10 Deluxe Rooms & Cabanas
            </span>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg shadow-emerald-950/5 border-b border-emerald-900/10 py-3' 
          : 'bg-white/90 backdrop-blur-sm border-b border-stone-200/80 py-4'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          
          {/* Logo */}
          <a href="#" className="no-underline">
            <Logo variant="dark" />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            <a href="#rooms" className="text-sm font-semibold text-emerald-950 hover:text-amber-600 transition-colors">
              Rooms & Cabanas
            </a>
            <a href="#amenities" className="text-sm font-semibold text-emerald-950 hover:text-amber-600 transition-colors">
              Amenities
            </a>
            <a href="#gallery" className="text-sm font-semibold text-emerald-950 hover:text-amber-600 transition-colors">
              Photo Gallery
            </a>
            <a href="#location" className="text-sm font-semibold text-emerald-950 hover:text-amber-600 transition-colors">
              Location
            </a>
            <a href="#reviews" className="text-sm font-semibold text-emerald-950 hover:text-amber-600 transition-colors">
              Reviews
            </a>
            <a href="#contact" className="text-sm font-semibold text-emerald-950 hover:text-amber-600 transition-colors">
              Contact Us
            </a>
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={PROPERTY_DETAILS.bookingComUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-full text-xs font-bold text-white bg-[#003580] hover:bg-[#00255a] transition-all shadow-sm hover:shadow-md"
            >
              Booking.com
            </a>
            <button
              onClick={onOpenBooking}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-emerald-900 to-emerald-800 hover:from-emerald-800 hover:to-emerald-700 transition-all shadow-md shadow-emerald-900/20 active:scale-95"
            >
              <Calendar className="w-4 h-4 text-amber-400" />
              <span>Book / Inquire Direct</span>
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-emerald-950 hover:text-amber-600 focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-stone-200 px-6 py-6 space-y-4 shadow-xl animate-fade-in">
            <a
              href="#rooms"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-bold text-emerald-950 hover:text-amber-600"
            >
              Rooms & Cabanas (10 Rooms)
            </a>
            <a
              href="#amenities"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-bold text-emerald-950 hover:text-amber-600"
            >
              Property Amenities
            </a>
            <a
              href="#gallery"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-bold text-emerald-950 hover:text-amber-600"
            >
              Photo Gallery
            </a>
            <a
              href="#location"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-bold text-emerald-950 hover:text-amber-600"
            >
              Location & Map
            </a>
            <a
              href="#reviews"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-bold text-emerald-950 hover:text-amber-600"
            >
              Guest Reviews
            </a>

            <div className="pt-4 border-t border-stone-200 space-y-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-full text-sm font-bold text-white bg-emerald-900 shadow-md"
              >
                <Calendar className="w-4 h-4 text-amber-400" />
                <span>Book Direct & Save</span>
              </button>

              <a
                href={PROPERTY_DETAILS.bookingComUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center py-3 rounded-full text-sm font-bold text-white bg-[#003580]"
              >
                Reserve on Booking.com
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
