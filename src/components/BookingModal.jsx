import React, { useState, useEffect } from 'react';
import useModalBehavior from '../hooks/useModalBehavior';
import { X, Calendar, Coffee, Mail, MessageCircle, Zap } from 'lucide-react';
import { PROPERTY_DETAILS, ROOMS_DATA } from '../data/roomsData';
import { BREAKFAST_PER_ADULT, displayRate, stayTotal } from '../data/pricing';
import { useCurrency } from '../context/currency';

// Local calendar date as YYYY-MM-DD (toISOString would use UTC and can give yesterday's date in Sri Lanka).
const toISODate = (date) => date.toLocaleDateString('en-CA');

const addDays = (iso, days) => {
  const [y, m, d] = iso.split('-').map(Number);
  return toISODate(new Date(y, m - 1, d + days));
};

export default function BookingModal({ room, defaultBreakfast = false, onClose }) {
  const { format, currency } = useCurrency();
  useModalBehavior(onClose);
  const [selectedRoomId, setSelectedRoomId] = useState(room?.id || ROOMS_DATA[0].id);
  const [includeBreakfast, setIncludeBreakfast] = useState(defaultBreakfast);
  const [guests, setGuests] = useState(room?.maxGuests || 2);
  const [checkIn, setCheckIn] = useState(toISODate(new Date()));
  const [checkOut, setCheckOut] = useState(addDays(toISODate(new Date()), 2));
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [note, setNote] = useState('');

  const activeRoom = ROOMS_DATA.find((r) => r.id === selectedRoomId) || ROOMS_DATA[0];

  useEffect(() => {
    if (guests > activeRoom.maxGuests) setGuests(activeRoom.maxGuests);
  }, [activeRoom, guests]);

  const { total: totalPrice, nights, unpricedNights } = stayTotal(activeRoom, checkIn, checkOut, includeBreakfast, guests);
  const datesValid = Boolean(checkIn && checkOut) && checkOut > checkIn;
  const hasRates = datesValid && unpricedNights === 0;

  // Keep check-out after check-in when the arrival date is moved later
  const handleCheckIn = (value) => {
    setCheckIn(value);
    if (value && checkOut <= value) setCheckOut(addDays(value, 1));
  };
  const estimateText = !datesValid ? '-' : hasRates ? format(totalPrice) : 'Rate on request';
  // The inquiry always states the LKR amount (the tariff currency), plus the converted figure if another currency is shown.
  const messageTotal = !hasRates
    ? 'Rate on request'
    : currency === 'LKR'
      ? `LKR ${totalPrice.toLocaleString('en-US')}`
      : `LKR ${totalPrice.toLocaleString('en-US')} (about ${format(totalPrice)})`;

  const buildMessage = () =>
    [
      'Hi Paradise Bungalow!',
      '',
      'I would like to make a booking inquiry:',
      `- Room: ${activeRoom.title}`,
      `- Check-in: ${checkIn}`,
      `- Check-out: ${checkOut} (${nights} night${nights > 1 ? 's' : ''})`,
      `- Guests: ${guests}`,
      `- Breakfast: ${includeBreakfast ? `Yes (+LKR ${BREAKFAST_PER_ADULT.toLocaleString('en-US')} per adult/night)` : 'No (Room Only)'}`,
      `- Name: ${name.trim() || 'Guest'}`,
      email ? `- Email: ${email}` : null,
      phone ? `- Phone: ${phone}` : null,
      note ? `- Special requests: ${note}` : null,
      '',
      `Estimated total: ${messageTotal}`,
      '',
      'Please confirm availability.',
    ]
      .filter((line) => line !== null)
      .join('\n');

  const handleWhatsApp = () => {
    if (!datesValid) return;
    window.open(
      `https://wa.me/${PROPERTY_DETAILS.phoneClean}?text=${encodeURIComponent(buildMessage())}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  const handleEmail = () => {
    if (!datesValid) return;
    const subject = `Booking inquiry: ${activeRoom.title} (${checkIn} to ${checkOut})`;
    window.location.href = `mailto:${PROPERTY_DETAILS.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(buildMessage())}`;
  };

  const inputClass =
    'w-full p-3 rounded-xl border border-stone-300 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none bg-stone-50';
  const labelClass = 'block text-xs font-bold text-emerald-950 uppercase tracking-wider mb-1.5';

  return (
    <div
      className="fixed inset-0 z-50 bg-emerald-950/85 backdrop-blur-md flex items-end sm:items-center justify-center sm:p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Booking inquiry"
    >
      <div
        className="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-2xl max-h-[94dvh] sm:max-h-[92vh] overflow-hidden flex flex-col relative shadow-2xl animate-sheet-up border border-stone-200"
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
            <label htmlFor="booking-room" className={labelClass}>Room</label>
            <select
              id="booking-room"
              value={selectedRoomId}
              onChange={(e) => setSelectedRoomId(e.target.value)}
              className={inputClass}
            >
              {ROOMS_DATA.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.title} — from {format(displayRate(r).amount)}/night
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
            <div>
              <label htmlFor="booking-checkin" className={labelClass}>Check-in</label>
              <input
                id="booking-checkin"
                type="date"
                value={checkIn}
                min={toISODate(new Date())}
                onChange={(e) => handleCheckIn(e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="booking-checkout" className={labelClass}>Check-out</label>
              <input
                id="booking-checkout"
                type="date"
                value={checkOut}
                min={addDays(checkIn || toISODate(new Date()), 1)}
                onChange={(e) => setCheckOut(e.target.value)}
                className={inputClass}
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="booking-guests" className={labelClass}>Guests</label>
              <select id="booking-guests" value={guests} onChange={(e) => setGuests(Number(e.target.value))} className={inputClass}>
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
              Include breakfast (+{format(BREAKFAST_PER_ADULT)} per adult/night)
            </span>
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="booking-name" className={labelClass}>Your Name</label>
              <input id="booking-name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. John Doe" className={inputClass} />
            </div>
            <div>
              <label htmlFor="booking-phone" className={labelClass}>Phone / WhatsApp</label>
              <input id="booking-phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+1 234 567 890" className={inputClass} />
            </div>
          </div>

          <div>
            <label htmlFor="booking-email" className={labelClass}>Email</label>
            <input id="booking-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="e.g. john@example.com" className={inputClass} />
          </div>

          <div>
            <label htmlFor="booking-note" className={labelClass}>Special Requests</label>
            <textarea id="booking-note" rows="2" value={note} onChange={(e) => setNote(e.target.value)} placeholder="Arrival time, airport transfer, etc." className={inputClass} />
          </div>
        </div>

        {/* Pinned footer: estimate and send buttons stay visible while the form scrolls */}
        <div className="border-t border-stone-200 bg-white px-5 sm:px-6 pt-4 pb-4 safe-bottom space-y-3 shadow-[0_-8px_24px_-12px_rgba(0,0,0,0.15)]">
          <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded-2xl p-3 sm:p-4">
            <div className="flex items-center gap-2 text-xs text-emerald-900">
              <Calendar className="w-4 h-4 text-emerald-700" />
              {datesValid ? `${nights} night${nights > 1 ? 's' : ''}, ${guests} guest${guests > 1 ? 's' : ''}` : 'Check-out must be after check-in'}
            </div>
            <div className="text-right">
              <div className="text-[10px] uppercase tracking-wider text-stone-500 font-bold">Estimated total</div>
              <div className="font-serif text-2xl font-bold text-emerald-950">{estimateText}</div>
            </div>
          </div>

          {/* Send buttons */}
          <div className="flex gap-2.5 sm:gap-3">
            <button
              type="button"
              onClick={handleWhatsApp}
              disabled={!datesValid}
              className="flex-1 py-3.5 rounded-full text-[13px] sm:text-sm font-bold text-white bg-[#25D366] hover:bg-[#1eb956] transition-colors flex items-center justify-center gap-2 shadow-md active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
            >
              <MessageCircle className="w-4 h-4" />
              Send via WhatsApp
            </button>
            <button
              type="button"
              onClick={handleEmail}
              disabled={!datesValid}
              className="flex-1 py-3.5 rounded-full text-[13px] sm:text-sm font-bold text-emerald-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 transition-all flex items-center justify-center gap-2 shadow-md active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
            >
              <Mail className="w-4 h-4" />
              Send via Email
            </button>
          </div>
          <p className="hidden sm:block text-[11px] text-stone-500 text-center">
            This is an inquiry, not a confirmed booking. We will reply to confirm availability and details.
          </p>
        </div>
      </div>
    </div>
  );
}
