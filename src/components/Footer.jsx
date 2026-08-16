import React from 'react';
import { Phone, Mail, MapPin, ExternalLink, Heart, Home, BedDouble, Users, UtensilsCrossed, Sparkles, MessageSquare } from 'lucide-react';
import Logo from './Logo';
import { PROPERTY_DETAILS } from '../data/roomsData';
import { HMS_CONFIG } from '../services/hmsApi';

export default function Footer({ onOpenBooking }) {
  return (
    <footer className="bg-emerald-950 text-white pt-16 pb-24 md:pb-12 border-t border-emerald-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Brand Info */}
          <div>
            <div className="mb-4">
              <Logo variant="light" />
            </div>

            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed mb-6">
              Your serene garden sanctuary in Midigama, Sri Lanka. Offering 8 boutique rooms including eco wooden cabanas, upper floor balcony rooms, family suites, and a private kitchen apartment suite.
            </p>

            <button
              onClick={() => onOpenBooking()}
              className="px-5 py-2.5 rounded-full text-xs font-bold text-emerald-950 bg-amber-400 hover:bg-amber-300 transition-colors shadow-md flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 fill-emerald-950" />
              <span>Book Direct (Best Rate)</span>
            </button>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg font-bold text-amber-300 mb-4">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-stone-300">
              <li><a href="#rooms" className="hover:text-amber-400 transition-colors">Rooms & Cabanas (8 Units)</a></li>
              <li><a href="#amenities" className="hover:text-amber-400 transition-colors">Property Amenities</a></li>
              <li><a href="#gallery" className="hover:text-amber-400 transition-colors">Photo Gallery</a></li>
              <li><a href="#location" className="hover:text-amber-400 transition-colors">Location & Directions</a></li>
              <li><a href="#reviews" className="hover:text-amber-400 transition-colors">Guest Reviews</a></li>
              <li>
                <a
                  href={HMS_CONFIG.REVIEW_ENGINE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-300 hover:text-amber-200 transition-colors flex items-center gap-1"
                >
                  <MessageSquare className="w-3 h-3" />
                  <span>Write a Review (HMS)</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Room Summary (8 Units) */}
          <div>
            <h4 className="font-serif text-lg font-bold text-amber-300 mb-4">
              Room Inventory (8 Units)
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-300">
              <li className="flex items-center gap-2">
                <Home className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>2 Wooden Cabanas ($21)</span>
              </li>
              <li className="flex items-center gap-2">
                <BedDouble className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>1 Deluxe Double with Balcony ($25)</span>
              </li>
              <li className="flex items-center gap-2">
                <BedDouble className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>1 Standard Double Ground AC ($25)</span>
              </li>
              <li className="flex items-center gap-2">
                <Users className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>2 Bungalow Family Rooms ($32)</span>
              </li>
              <li className="flex items-center gap-2">
                <Users className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>1 Spacious Family Room 4P ($38)</span>
              </li>
              <li className="flex items-center gap-2">
                <UtensilsCrossed className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>1 Superior Suite with Kitchen ($36)</span>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="font-serif text-lg font-bold text-amber-300 mb-4">
              Contact & Booking
            </h4>
            <div className="space-y-3 text-xs sm:text-sm text-stone-300">
              <a href={`tel:${PROPERTY_DETAILS.phoneClean}`} className="flex items-center gap-2 hover:text-amber-400 transition-colors">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{PROPERTY_DETAILS.phone}</span>
              </a>
              <a href={`mailto:${PROPERTY_DETAILS.email}`} className="flex items-center gap-2 hover:text-amber-400 transition-colors">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{PROPERTY_DETAILS.email}</span>
              </a>
              <a href={HMS_CONFIG.BOOKING_ENGINE_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-amber-300 hover:text-amber-200 transition-colors">
                <ExternalLink className="w-4 h-4 shrink-0" />
                <span>Official HMS Booking Engine</span>
              </a>
              <a href={PROPERTY_DETAILS.bookingComUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-stone-300 hover:text-white transition-colors">
                <ExternalLink className="w-4 h-4 shrink-0" />
                <span>Booking.com Listing</span>
              </a>
              <a href={PROPERTY_DETAILS.airbnbUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-stone-300 hover:text-white transition-colors">
                <ExternalLink className="w-4 h-4 shrink-0" />
                <span>Airbnb Listing</span>
              </a>
            </div>
          </div>

        </div>

        <hr className="border-emerald-900 my-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <div>
            © {new Date().getFullYear()} Paradise Bungalow Midigama. All rights reserved. Powered by HMS.
          </div>
          <div className="flex items-center gap-1.5">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>by</span>
            <a
              href="https://paradisecrew.site"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-300 font-semibold hover:text-amber-200 underline underline-offset-2 transition-colors"
            >
              Paradise Crew
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
