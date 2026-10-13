import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import RoomCard from './components/RoomCard';
import RoomModal from './components/RoomModal';
import BookingModal from './components/BookingModal';
import Amenities from './components/Amenities';
import Gallery from './components/Gallery';
import LocationMap from './components/LocationMap';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import CurrencySwitcher from './components/CurrencySwitcher';
import { ROOMS_DATA, ROOM_CATEGORIES } from './data/roomsData';
import { Sparkles } from 'lucide-react';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [modalRoom, setModalRoom] = useState(null);
  const [bookingRoom, setBookingRoom] = useState(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [defaultBreakfast, setDefaultBreakfast] = useState(false);

  const filteredRooms = selectedCategory === 'all'
    ? ROOMS_DATA
    : ROOMS_DATA.filter((r) => r.category === selectedCategory);

  const handleOpenBooking = (room = null, breakfast = false) => {
    setBookingRoom(room);
    setDefaultBreakfast(breakfast);
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans selection:bg-amber-400 selection:text-emerald-950">
      
      {/* Navigation */}
      <Navbar onOpenBooking={() => handleOpenBooking()} />

      {/* Hero Section */}
      <Hero onOpenBooking={() => handleOpenBooking()} />

      {/* Main Accommodations Section */}
      <section id="rooms" className="py-14 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-900/10 text-emerald-900 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" /> 7 Rooms
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-semibold text-emerald-950 tracking-tight">
            Handcrafted Accommodations
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-3 font-light leading-relaxed">
            From an authentic wooden cabana in lush garden glades to king rooms and family rooms with balconies. Experience pure serenity just 50 meters from Midigama beach.
          </p>
        </div>

        <div className="flex items-center justify-center gap-3 mb-6">
          <span className="text-[11px] font-bold uppercase tracking-widest text-stone-700">Show prices in</span>
          <CurrencySwitcher tone="light" />
        </div>

        {/* Category Filters */}
        <div className="-mx-4 sm:mx-0 mb-10 sm:mb-12">
        <div className="flex sm:flex-wrap sm:justify-center items-center gap-2.5 px-4 sm:px-2 overflow-x-auto no-scrollbar">
          {ROOM_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`shrink-0 px-5 py-3 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-300 ${
                selectedCategory === cat.id
                  ? 'bg-emerald-950 text-amber-300 shadow-md shadow-emerald-950/20 scale-105'
                  : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
        </div>

        {/* Room Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredRooms.map((room) => (
            <RoomCard
              key={room.id}
              room={room}
              onViewDetails={(r) => setModalRoom(r)}
              onSelectRoom={(r, breakfast) => handleOpenBooking(r, breakfast)}
            />
          ))}
        </div>

        {/* Direct Booking Highlight Banner */}
        <div className="mt-16 bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-950 text-white rounded-2xl p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl shadow-emerald-950/20 border border-emerald-800/30">
          <div className="max-w-xl">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block mb-2">
              ⚡ Guaranteed Best Rate · 0% Extra Commission
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-amber-200 mb-2">
              Book Direct for the Best Rate
            </h3>
            <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
              Skip third-party OTA fees and enjoy complimentary flexible check-in, priority room selection, airport transfer arrangements, and instant WhatsApp communication directly with the property host.
            </p>
          </div>

          <button
            onClick={() => handleOpenBooking()}
            className="px-8 py-4 rounded-full text-sm font-bold text-emerald-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 transition-all shadow-lg shadow-amber-500/20 shrink-0 active:scale-95"
          >
            Direct Reservation
          </button>
        </div>
      </section>

      {/* Property Amenities */}
      <Amenities />

      {/* Photo Gallery */}
      <Gallery />

      {/* Surroundings & Location Map */}
      <LocationMap />

      {/* Contact & Inquiry Form */}
      <ContactForm onOpenBooking={() => handleOpenBooking()} />

      {/* Footer */}
      <Footer onOpenBooking={() => handleOpenBooking()} />

      {/* Room Detail Modal */}
      {modalRoom && (
        <RoomModal
          room={modalRoom}
          onClose={() => setModalRoom(null)}
          onOpenBooking={(r) => handleOpenBooking(r)}
        />
      )}

      {/* Interactive Booking Modal */}
      {isBookingOpen && (
        <BookingModal
          room={bookingRoom}
          defaultBreakfast={defaultBreakfast}
          onClose={() => {
            setIsBookingOpen(false);
            setBookingRoom(null);
          }}
        />
      )}

    </div>
  );
}
