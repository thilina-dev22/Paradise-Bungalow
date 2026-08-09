import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import RoomCard from './components/RoomCard';
import RoomModal from './components/RoomModal';
import BookingModal from './components/BookingModal';
import Amenities from './components/Amenities';
import Gallery from './components/Gallery';
import LocationMap from './components/LocationMap';
import Reviews from './components/Reviews';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';

import { ROOMS_DATA, ROOM_CATEGORIES, PROPERTY_DETAILS } from './data/roomsData';
import { Sparkles, Phone, MessageSquare, MapPin, Calendar, Star } from 'lucide-react';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [modalRoom, setModalRoom] = useState(null);
  const [bookingRoom, setBookingRoom] = useState(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const filteredRooms = selectedCategory === 'all'
    ? ROOMS_DATA
    : ROOMS_DATA.filter((r) => r.category === selectedCategory);

  const handleOpenBooking = (room = null) => {
    setBookingRoom(room);
    setIsBookingModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900 font-sans selection:bg-amber-400 selection:text-emerald-950">
      
      {/* Navbar */}
      <Navbar onOpenBooking={() => handleOpenBooking()} />

      {/* Hero */}
      <Hero onOpenBooking={() => handleOpenBooking()} />

      {/* Main Rooms & Cabanas Section */}
      <section id="rooms" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/15 text-amber-800 text-xs font-bold uppercase tracking-wider mb-3 border border-amber-500/30">
              <Sparkles className="w-3.5 h-3.5" /> 10 Rooms • 5 Categories
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-emerald-950 mb-3">
              Rooms & Wooden Cabanas
            </h2>
            <p className="text-sm sm:text-base text-stone-600">
              All accommodations feature free high-speed optical WiFi, soundproofing, private garden views, and optional exceptional breakfast.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {ROOM_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  selectedCategory === cat.id
                    ? 'bg-gradient-to-r from-emerald-950 to-emerald-900 text-white shadow-md shadow-emerald-950/20'
                    : 'bg-white text-emerald-950 border border-stone-300 hover:border-emerald-900/30'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Room Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRooms.map((room) => (
              <RoomCard
                key={room.id}
                room={room}
                onSelectRoom={(r) => handleOpenBooking(r)}
                onViewDetails={(r) => setModalRoom(r)}
              />
            ))}
          </div>

          {/* Direct Booking Advantage Banner */}
          <div className="mt-16 bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-950 text-white rounded-2xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl shadow-emerald-950/20 border border-emerald-800/30">
            <div>
              <span className="inline-flex items-center gap-1.5 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                Direct Booking Advantage
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold">
                Best Price Guarantee &amp; Instant Confirmation
              </h3>
              <p className="text-stone-300/80 text-xs sm:text-sm mt-2">
                No hidden reservation fees. Free cancellation and direct host support via WhatsApp.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 w-full md:w-auto justify-center shrink-0">
              <button
                onClick={() => handleOpenBooking()}
                className="px-6 py-3 rounded-full text-sm font-bold text-emerald-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 transition-all shadow-lg shadow-amber-500/20"
              >
                Inquire / Book Direct
              </button>
              <a
                href={PROPERTY_DETAILS.bookingComUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full text-sm font-bold text-white bg-white/10 border border-white/20 hover:bg-white/20 transition-all"
              >
                Book on Booking.com
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* Property Amenities */}
      <Amenities />

      {/* Photo Gallery */}
      <Gallery />

      {/* Location Map & Surroundings */}
      <LocationMap />

      {/* Guest Reviews */}
      <Reviews />

      {/* Contact Us Form */}
      <ContactForm />

      {/* Footer */}
      <Footer onOpenBooking={() => handleOpenBooking()} />



      {/* Modals */}
      {modalRoom && (
        <RoomModal
          room={modalRoom}
          onClose={() => setModalRoom(null)}
          onOpenBooking={(r) => handleOpenBooking(r)}
        />
      )}

      {isBookingModalOpen && (
        <BookingModal
          selectedRoom={bookingRoom}
          onClose={() => setIsBookingModalOpen(false)}
        />
      )}

    </div>
  );
}
