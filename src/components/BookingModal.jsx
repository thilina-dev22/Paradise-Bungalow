import React, { useState } from 'react';
import { X, Coffee, PhoneCall, Mail, ExternalLink, Sparkles } from 'lucide-react';
import { ROOMS_DATA, PROPERTY_DETAILS } from '../data/roomsData';

export default function BookingModal({ selectedRoom, onClose }) {
  const [roomId, setRoomId] = useState(selectedRoom ? selectedRoom.id : ROOMS_DATA[0].id);
  const [guests, setGuests] = useState(2);
  const [nights, setNights] = useState(2);
  const [includeBreakfast, setIncludeBreakfast] = useState(true);
  const [checkInDate, setCheckInDate] = useState('');
  const [guestName, setGuestName] = useState('');
  const [note, setNote] = useState('');

  const currentRoom = ROOMS_DATA.find((r) => r.id === roomId) || ROOMS_DATA[0];
  const ratePerNight = includeBreakfast ? currentRoom.priceBreakfast : currentRoom.priceOnly;
  const totalPrice = ratePerNight * nights;

  const handleWhatsAppSubmit = (e) => {
    e.preventDefault();
    const msg = `Hello Paradise Bungalow! 👋
I would like to reserve:
- *Room*: ${currentRoom.title} (${currentRoom.size})
- *Check-in*: ${checkInDate || 'Not specified'}
- *Duration*: ${nights} night(s)
- *Guests*: ${guests} guest(s)
- *Breakfast*: ${includeBreakfast ? 'Yes (Exceptional Breakfast included)' : 'No (Room only)'}
- *Total Estimated Rate*: US$${totalPrice}
- *Guest Name*: ${guestName || 'Valued Guest'}
${note ? `- *Special Request*: ${note}` : ''}

Could you please confirm availability and provide details? Thank you!`;

    const url = `https://wa.me/${PROPERTY_DETAILS.phoneClean}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-emerald-950/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-3xl w-full max-w-2xl max-h-[92vh] overflow-y-auto relative shadow-2xl animate-fade-in border border-stone-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-emerald-950 to-emerald-900 text-white p-6 sm:p-8 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4" /> Direct Reservation Inquiry
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold">
            Reserve Your Stay
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 mt-1">
            Calculate your estimated rate and contact us instantly via WhatsApp or Email.
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleWhatsAppSubmit} className="p-6 sm:p-8 space-y-5">
          
          {/* Room Selection */}
          <div>
            <label className="block text-xs font-bold text-emerald-950 uppercase tracking-wider mb-2">
              Select Accommodation (10 Total Rooms)
            </label>
            <select
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              className="w-full p-3.5 rounded-xl border border-stone-300 text-sm font-semibold text-emerald-950 bg-stone-50 focus:ring-2 focus:ring-amber-500 focus:outline-none"
            >
              {ROOMS_DATA.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.title} ({r.size} • Sleeps {r.maxGuests}) — From US${r.priceOnly}/night
                </option>
              ))}
            </select>
          </div>

          {/* Dates & Capacity Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-emerald-950 uppercase tracking-wider mb-1.5">
                Check-in Date
              </label>
              <input
                type="date"
                value={checkInDate}
                onChange={(e) => setCheckInDate(e.target.value)}
                className="w-full p-3 rounded-xl border border-stone-300 text-sm text-stone-800 focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-emerald-950 uppercase tracking-wider mb-1.5">
                Nights
              </label>
              <input
                type="number"
                min="1"
                max="30"
                value={nights}
                onChange={(e) => setNights(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full p-3 rounded-xl border border-stone-300 text-sm text-stone-800 focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-emerald-950 uppercase tracking-wider mb-1.5">
                Guests
              </label>
              <select
                value={guests}
                onChange={(e) => setGuests(parseInt(e.target.value))}
                className="w-full p-3 rounded-xl border border-stone-300 text-sm text-stone-800 focus:ring-2 focus:ring-amber-500 focus:outline-none"
              >
                {[1, 2, 3, 4].map((num) => (
                  <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Breakfast Toggle */}
          <div 
            onClick={() => setIncludeBreakfast(!includeBreakfast)}
            className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
              includeBreakfast 
                ? 'bg-amber-50 border-amber-400 text-amber-950 shadow-sm' 
                : 'bg-stone-50 border-stone-200 text-stone-600'
            }`}
          >
            <div className="flex items-center gap-3">
              <Coffee className="w-5 h-5 text-amber-600" />
              <div>
                <div className="font-bold text-sm text-emerald-950">
                  Include Exceptional Breakfast
                </div>
                <div className="text-xs text-stone-500">
                  Fresh tropical fruit, tea/coffee & breakfast (+US$5/night)
                </div>
              </div>
            </div>
            <input
              type="checkbox"
              checked={includeBreakfast}
              onChange={(e) => setIncludeBreakfast(e.target.checked)}
              className="w-5 h-5 accent-emerald-900 rounded cursor-pointer"
            />
          </div>

          {/* Guest Name & Notes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-emerald-950 uppercase tracking-wider mb-1.5">
                Your Name
              </label>
              <input
                type="text"
                placeholder="Full Name"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                className="w-full p-3 rounded-xl border border-stone-300 text-sm text-stone-800 focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-emerald-950 uppercase tracking-wider mb-1.5">
                Special Requests
              </label>
              <input
                type="text"
                placeholder="e.g. Airport shuttle, early check-in"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full p-3 rounded-xl border border-stone-300 text-sm text-stone-800 focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Estimated Price Box */}
          <div className="bg-emerald-950 text-white p-5 rounded-2xl flex items-center justify-between shadow-lg shadow-emerald-950/20">
            <div>
              <div className="text-xs text-emerald-300">
                Estimated Rate ({nights} night{nights > 1 ? 's' : ''})
              </div>
              <div className="text-xs text-amber-400 font-semibold mt-0.5">
                {includeBreakfast ? '✓ Breakfast Included' : 'Standard Room Only'} • 12% Genius Discount Applied
              </div>
            </div>

            <div className="text-right">
              <div className="text-3xl font-extrabold text-amber-300 leading-none">
                US${totalPrice}
              </div>
              <span className="text-[11px] text-emerald-400 font-medium">No credit card needed</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-2.5 pt-2">
            <button
              type="submit"
              className="w-full py-4 rounded-full text-base font-bold text-white bg-[#25D366] hover:bg-[#1eb956] transition-colors flex items-center justify-center gap-2 shadow-lg shadow-green-900/20"
            >
              <PhoneCall className="w-5 h-5" />
              <span>Book Direct via WhatsApp (Instant)</span>
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <a
                href={PROPERTY_DETAILS.bookingComUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 rounded-full text-sm font-bold text-white bg-[#003580] hover:bg-[#00255a] transition-colors flex items-center justify-center gap-1.5"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Reserve on Booking.com</span>
              </a>

              <a
                href={`mailto:${PROPERTY_DETAILS.email}?subject=Reservation Inquiry - Paradise Bungalow`}
                className="py-3 rounded-full text-sm font-bold text-emerald-950 border border-emerald-900/30 hover:bg-emerald-950 hover:text-white transition-colors flex items-center justify-center gap-1.5"
              >
                <Mail className="w-4 h-4" />
                <span>Send Email Inquiry</span>
              </a>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}
