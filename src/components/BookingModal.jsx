import React, { useState, useEffect } from 'react';
import { X, Calendar, Coffee, Mail, MessageCircle, Zap } from 'lucide-react';
import { PROPERTY_DETAILS, ROOMS_DATA } from '../data/roomsData';

const BREAKFAST_PER_NIGHT = 5;

const toISODate = (date) => date.toISOString().split('T')[0];

export default function BookingModal({ room, defaultBreakfast = false, onClose }) {
  const [selectedRoomId, setSelectedRoomId] = useState(room?.id || ROOMS_DATA[0].id);
  const [includeBreakfast, setIncludeBreakfast] = useState(defaultBreakfast);
  const [nights, setNights] = useState(2);
  const [guests, setGuests] = useState(room?.maxGuests || 2);
  const [checkIn, setCheckIn] = useState(toISODate(new Date()));
  const [checkOut, setCheckOut] = useState(toISODate(new Date(Date.now() + 86400000 * 2)));
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [note, setNote] = useState('');

  const activeRoom = ROOMS_DATA.find((r) => r.id === selectedRoomId) || ROOMS_DATA[0];

  useEffect(() => {
    if (checkIn && checkOut) {
      const diffDays = Math.ceil((new Date(checkOut) - new Date(checkIn)) / 86400000);
      if (diffDays > 0) setNights(diffDays);
    }
  }, [checkIn, checkOut]);

  useEffect(() => {
    if (guests > activeRoom.maxGuests) setGuests(activeRoom.maxGuests);
  }, [activeRoom, guests]);

  const nightlyRate = includeBreakfast ? activeRoom.priceBreakfast : activeRoom.priceOnly;
  const totalPrice = nightlyRate * nights;

  const buildMessage = () =>
    [
      'Hi Paradise Bungalow!',
      '',
      'I would like to make a booking inquiry:',
      `- Room: ${activeRoom.title}`,
      `- Check-in: ${checkIn}`,
      `- Check-out: ${checkOut} (${nights} night${nights > 1 ? 's' : ''})`,
      `- Guests: ${guests}`,
      `- Breakfast: ${includeBreakfast ? `Yes (+US$${BREAKFAST_PER_NIGHT}/night)` : 'No (Room Only)'}`,
      `- Name: ${name.trim() || 'Guest'}`,
      email ? `- Email: ${email}` : null,
      phone ? `- Phone: ${phone}` : null,
      note ? `- Special requests: ${note}` : null,
      '',
      `Estimated total: US$${totalPrice}`,
      '',
      'Please confirm availability.',
    ]
      .filter((line) => line !== null)
      .join('\n');

  const handleWhatsApp = () => {
    window.open(
      `https://wa.me/${PROPERTY_DETAILS.phoneClean}?text=${encodeURIComponent(buildMessage())}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  const handleEmail = () => {
    const subject = `Booking inquiry: ${activeRoom.title} (${checkIn} to ${checkOut})`;
    window.location.href = `mailto:${PROPERTY_DETAILS.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(buildMessage())}`;
  };

  const inputClass =
    'w-full p-3 rounded-xl border border-stone-300 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none bg-stone-50';
  const labelClass = 'block text-xs font-bold text-emerald-950 uppercase tracking-wider mb-1.5';

  return (
    <div
      className="fixed inset-0 z-50 bg-emerald-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl w-full max-w-2xl max-h-[92vh] overflow-hidden flex flex-col relative shadow-2xl animate-fade-in border border-stone-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-950 to-emerald-900 text-white p-5 sm:p-6 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Zap className="w-3.5 h-3.5 fill-amber-400" />
              Booking Inquiry
            </div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold">Reserve at Paradise Bungalow</h2>
            <p className="text-stone-300 text-xs mt-0.5">
              Send your inquiry by WhatsApp or email and we will confirm availability.
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-stone-300 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6 overflow-y-auto custom-modal-scrollbar space-y-4">
          <div>
            <label className={labelClass}>Room</label>
            <select
              value={selectedRoomId}
              onChange={(e) => setSelectedRoomId(e.target.value)}
              className={inputClass}
            >
              {ROOMS_DATA.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.title} — from US${r.priceOnly}/night
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className={labelClass}>Check-in</label>
              <input
                type="date"
                value={checkIn}
                min={toISODate(new Date())}
                onChange={(e) => setCheckIn(e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Check-out</label>
              <input
                type="date"
                value={checkOut}
                min={checkIn}
                onChange={(e) => setCheckOut(e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Guests</label>
              <select value={guests} onChange={(e) => setGuests(Number(e.target.value))} className={inputClass}>
                {Array.from({ length: activeRoom.maxGuests }, (_, i) => i + 1).map((n) => (
                  <option key={n} value={n}>
                    {n} guest{n > 1 ? 's' : ''}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <label className="flex items-center gap-3 p-3.5 rounded-xl border border-stone-200 bg-stone-50 cursor-pointer">
            <input
              type="checkbox"
              checked={includeBreakfast}
              onChange={(e) => setIncludeBreakfast(e.target.checked)}
              className="w-4 h-4 accent-emerald-900"
            />
            <Coffee className="w-4 h-4 text-amber-600 shrink-0" />
            <span className="text-sm text-emerald-950 font-semibold">
              Include breakfast (+US${BREAKFAST_PER_NIGHT}/night)
            </span>
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Your Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. John Doe" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Phone / WhatsApp</label>
              <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+1 234 567 890" className={inputClass} />
            </div>
          </div>

          <div>
            <label className={labelClass}>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="e.g. john@example.com" className={inputClass} />
          </div>

          <div>
            <label className={labelClass}>Special Requests</label>
            <textarea rows="2" value={note} onChange={(e) => setNote(e.target.value)} placeholder="Arrival time, airport transfer, etc." className={inputClass} />
          </div>

          {/* Estimate */}
          <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded-2xl p-4">
            <div className="flex items-center gap-2 text-xs text-emerald-900">
              <Calendar className="w-4 h-4 text-emerald-700" />
              {nights} night{nights > 1 ? 's' : ''} × US${nightlyRate}
            </div>
            <div className="text-right">
              <div className="text-[10px] uppercase tracking-wider text-stone-500 font-bold">Estimated total</div>
              <div className="font-serif text-2xl font-bold text-emerald-950">US${totalPrice}</div>
            </div>
          </div>

          {/* Send buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-1">
            <button
              type="button"
              onClick={handleWhatsApp}
              className="flex-1 py-3.5 rounded-full text-sm font-bold text-white bg-[#25D366] hover:bg-[#1eb956] transition-colors flex items-center justify-center gap-2 shadow-md active:scale-95"
            >
              <MessageCircle className="w-4 h-4" />
              Send via WhatsApp
            </button>
            <button
              type="button"
              onClick={handleEmail}
              className="flex-1 py-3.5 rounded-full text-sm font-bold text-emerald-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 transition-all flex items-center justify-center gap-2 shadow-md active:scale-95"
            >
              <Mail className="w-4 h-4" />
              Send via Email
            </button>
          </div>
          <p className="text-[11px] text-stone-500 text-center">
            This is an inquiry, not a confirmed booking. We will reply to confirm availability and details.
          </p>
        </div>
      </div>
    </div>
  );
}
