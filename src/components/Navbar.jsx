import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Sparkles, MessageCircle } from 'lucide-react';
import Logo from './Logo';
import CurrencySwitcher from './CurrencySwitcher';
import { PROPERTY_DETAILS } from '../data/roomsData';

const NAV_LINKS = [
  { name: 'Rooms', href: '#rooms' },
  { name: 'Amenities', href: '#amenities' },
  { name: 'Gallery', href: '#gallery' },
  { name: 'Reviews', href: '#reviews' },
  { name: 'Location', href: '#location' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar({ onOpenBooking }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock page scroll behind the open mobile menu
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const solid = scrolled || isOpen;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        solid
          ? 'bg-emerald-950/95 backdrop-blur-md py-2.5 shadow-lg shadow-emerald-950/20 border-b border-emerald-900/60'
          : 'bg-gradient-to-b from-black/70 to-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-3">
        <a href="#top" className="min-w-0">
          <Logo variant="light" />
        </a>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-7 text-xs font-bold text-white/90">
          {NAV_LINKS.map((link) => (
            <a key={link.name} href={link.href} className="hover:text-amber-300 uppercase tracking-[0.14em] [text-shadow:0_1px_8px_rgba(0,0,0,0.6)]">
              {link.name}
            </a>
          ))}
        </div>

        {/* Desktop actions */}
        <div className="hidden md:flex items-center gap-3">
          <CurrencySwitcher />
          <a
            href={`tel:${PROPERTY_DETAILS.phoneClean}`}
            className="hidden xl:flex items-center gap-1.5 text-xs text-stone-200 hover:text-amber-300 px-2 py-2"
          >
            <Phone className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-semibold">{PROPERTY_DETAILS.phone}</span>
          </a>
          <button
            onClick={() => onOpenBooking()}
            className="px-5 py-2.5 rounded-full text-xs font-bold text-emerald-950 bg-gradient-to-r from-amber-300 to-amber-400 hover:from-amber-200 hover:to-amber-300 shadow-md shadow-amber-500/20 flex items-center gap-1.5 active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Book Direct</span>
          </button>
        </div>

        {/* Mobile / tablet menu toggle */}
        <button
          onClick={() => setIsOpen((open) => !open)}
          className="lg:hidden text-white w-11 h-11 -mr-2 flex items-center justify-center rounded-full hover:bg-white/10"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu panel */}
      {isOpen && (
        <div className="lg:hidden bg-emerald-950 border-t border-emerald-900 px-5 pt-3 pb-6 max-h-[calc(100dvh-4.25rem)] overflow-y-auto animate-fade-in">
          <div className="divide-y divide-emerald-900/80">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block font-serif text-2xl text-white py-3.5 hover:text-amber-300"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="mt-5 flex items-center justify-between gap-3">
            <span className="text-[11px] font-bold uppercase tracking-widest text-stone-400">Currency</span>
            <CurrencySwitcher />
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <button
              onClick={() => {
                setIsOpen(false);
                onOpenBooking();
              }}
              className="py-3.5 rounded-full text-sm font-bold text-emerald-950 bg-amber-400 hover:bg-amber-300 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Book Direct
            </button>
            <a
              href={`https://wa.me/${PROPERTY_DETAILS.phoneClean}?text=${encodeURIComponent('Hi Paradise Bungalow! I would like to ask about a stay.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3.5 rounded-full text-sm font-bold text-white bg-[#13803f] hover:bg-[#0f6b34] flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
