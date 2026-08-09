import React, { useState, useEffect } from 'react';
import { Phone, Mail, Calendar, Menu, X, Star, ExternalLink } from 'lucide-react';
import Logo from './Logo';
import { PROPERTY_DETAILS } from '../data/roomsData';

const NAV_LINKS = [
  { href: '#rooms', label: 'Rooms' },
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
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-emerald-950 text-emerald-100 text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-5">
            <a
              href={`tel:${PROPERTY_DETAILS.phoneClean}`}
              className="flex items-center gap-1.5 hover:text-amber-400 transition-colors font-medium"
            >
              <Phone className="w-3 h-3 text-amber-400 shrink-0" />
              <span>{PROPERTY_DETAILS.phone}</span>
            </a>
            <a
              href={`mailto:${PROPERTY_DETAILS.email}`}
              className="hidden sm:flex items-center gap-1.5 hover:text-amber-400 transition-colors font-medium"
            >
              <Mail className="w-3 h-3 text-amber-400 shrink-0" />
              <span>{PROPERTY_DETAILS.email}</span>
            </a>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden md:inline text-emerald-300/70 text-[11px]">
              10 Rooms &amp; Cabanas · Midigama, Sri Lanka
            </span>
            <span className="inline-flex items-center gap-1 bg-amber-500/15 border border-amber-500/30 text-amber-300 px-2.5 py-0.5 rounded-full font-semibold text-[11px]">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              {PROPERTY_DETAILS.rating} / 10 Exceptional
            </span>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/98 backdrop-blur-md shadow-md shadow-emerald-950/8 border-b border-stone-200/60 py-3'
            : 'bg-white border-b border-stone-200/50 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">

          {/* Logo — left */}
          <a href="#" className="flex-shrink-0">
            <Logo variant="dark" />
          </a>

          {/* Desktop Nav — center */}
          <nav className="hidden xl:flex items-center gap-6">
            {NAV_LINKS.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className="whitespace-nowrap text-sm font-semibold text-stone-700 hover:text-emerald-800 transition-colors relative group"
              >
                {label}
                <span className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-amber-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left rounded-full" />
              </a>
            ))}
          </nav>

          {/* Desktop CTAs — right */}
          <div className="hidden sm:flex items-center gap-2 flex-shrink-0">
            <a
              href={PROPERTY_DETAILS.bookingComUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold text-stone-600 border border-stone-200 hover:border-emerald-900/30 hover:text-emerald-900 transition-all"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Booking.com
            </a>
            <button
              onClick={onOpenBooking}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold text-white bg-emerald-900 hover:bg-emerald-800 transition-all shadow-md shadow-emerald-900/20 active:scale-95 whitespace-nowrap"
            >
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              Book / Inquire
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-lg text-emerald-950 hover:bg-stone-100 transition-colors"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-white border-t border-stone-100 px-5 py-5 shadow-xl">
            <nav className="flex flex-col gap-1 mb-5">
              {NAV_LINKS.map(({ href, label }) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2.5 rounded-xl text-sm font-semibold text-emerald-950 hover:bg-stone-50 hover:text-emerald-700 transition-colors"
                >
                  {label}
                </a>
              ))}
            </nav>
            <div className="flex flex-col gap-2.5 pt-4 border-t border-stone-100">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-full text-sm font-bold text-white bg-emerald-900 shadow-md"
              >
                <Calendar className="w-4 h-4 text-amber-400" />
                Book Direct &amp; Save
              </button>
              <a
                href={PROPERTY_DETAILS.bookingComUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-full text-sm font-semibold text-stone-700 border border-stone-200 hover:border-emerald-900/30"
              >
                <ExternalLink className="w-4 h-4" />
                Reserve on Booking.com
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}