import React from 'react';
import { Phone, Mail, MapPin, Heart, BedDouble, Sparkles } from 'lucide-react';
import Logo from './Logo';
import { PROPERTY_DETAILS, ROOMS_DATA } from '../data/roomsData';

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
              Your serene garden sanctuary in Midigama, Sri Lanka. Offering 7 boutique rooms including a wooden cabana, king rooms, garden view and balcony rooms, and family rooms.
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
              <li><a href="#rooms" className="hover:text-amber-400 transition-colors">Rooms & Cabanas (7 Rooms)</a></li>
              <li><a href="#amenities" className="hover:text-amber-400 transition-colors">Property Amenities</a></li>
              <li><a href="#gallery" className="hover:text-amber-400 transition-colors">Photo Gallery</a></li>
              <li><a href="#location" className="hover:text-amber-400 transition-colors">Location & Directions</a></li>
              <li><a href="#reviews" className="hover:text-amber-400 transition-colors">Guest Reviews</a></li>
            </ul>
          </div>

          {/* Room Summary (7 Rooms) */}
          <div>
            <h4 className="font-serif text-lg font-bold text-amber-300 mb-4">
              Room Inventory (7 Rooms)
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-300">
              {ROOMS_DATA.map((room) => (
                <li key={room.id} className="flex items-center gap-2">
                  <BedDouble className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>{room.title} (${room.priceOnly})</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details (Prioritize Direct Booking) */}
          <div>
            <h4 className="font-serif text-lg font-bold text-amber-300 mb-4">
              Direct Contact & Booking
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
              <a
                href={`https://wa.me/${PROPERTY_DETAILS.phoneClean}?text=Hi%20Paradise%20Bungalow!%20I%20would%20like%20to%20inquire%20about%20a%20reservation.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-emerald-300 hover:text-emerald-200 transition-colors"
              >
                <Phone className="w-4 h-4 shrink-0 text-[#25D366]" />
                <span>WhatsApp Direct Host Chat</span>
              </a>
              <div className="pt-2 flex flex-wrap gap-2 text-xs">
                <a href={PROPERTY_DETAILS.bookingComUrl} target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-blue-200 underline underline-offset-2">
                  Booking.com Listing
                </a>
                <span className="text-stone-500">·</span>
                <a href={PROPERTY_DETAILS.airbnbUrl} target="_blank" rel="noopener noreferrer" className="text-rose-300 hover:text-rose-200 underline underline-offset-2">
                  Airbnb Listing
                </a>
              </div>
            </div>
          </div>

        </div>

        <hr className="border-emerald-900 my-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <div>
            © {new Date().getFullYear()} Paradise Bungalow Midigama. All rights reserved.
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
