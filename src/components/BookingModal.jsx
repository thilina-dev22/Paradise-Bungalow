import React, { useState, useEffect } from 'react';
import {
  X,
  PhoneCall,
  Calendar,
  Coffee,
  CheckCircle2,
  ExternalLink,
  Mail,
  ShieldCheck,
  CreditCard,
  Building2,
  Banknote,
  Sparkles,
  Zap,
  Check,
  Loader2,
  AlertCircle,
  Globe,
} from 'lucide-react';
import { PROPERTY_DETAILS, ROOMS_DATA } from '../data/roomsData';
import { createDirectBooking, HMS_CONFIG } from '../services/hmsApi';

export default function BookingModal({ room, defaultBreakfast = false, onClose, prefillDates }) {
  const [activeTab, setActiveTab] = useState('direct'); // 'direct' | 'whatsapp' | 'otas'

  // Form State
  const [selectedRoomId, setSelectedRoomId] = useState(room?.id || ROOMS_DATA[0].id);
  const [includeBreakfast, setIncludeBreakfast] = useState(defaultBreakfast);
  const [nights, setNights] = useState(2);
  const [guests, setGuests] = useState(room?.maxGuests || 2);
  const [checkIn, setCheckIn] = useState(
    prefillDates?.checkIn || new Date().toISOString().split('T')[0]
  );
  const [checkOut, setCheckOut] = useState(
    prefillDates?.checkOut || new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0]
  );
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [note, setNote] = useState('');

  // Submission Status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(null);
  const [bookingError, setBookingError] = useState(null);

  const activeRoom = ROOMS_DATA.find((r) => r.id === selectedRoomId) || ROOMS_DATA[0];

  // Auto calculate nights when check-in/out changes
  useEffect(() => {
    if (checkIn && checkOut) {
      const d1 = new Date(checkIn);
      const d2 = new Date(checkOut);
      const diffDays = Math.ceil((d2 - d1) / (1000 * 60 * 60 * 24));
      if (diffDays > 0) setNights(diffDays);
    }
  }, [checkIn, checkOut]);

  // Pricing
  const pricePerNight = includeBreakfast ? activeRoom.priceBreakfast : activeRoom.priceOnly;
  const totalPrice = pricePerNight * nights;

  // Handle Direct HMS Submission
  const handleDirectBookingSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setBookingError(null);

    try {
      const payload = {
        roomTypeId: Number(activeRoom.hmsRoomTypeId || 1),
        checkInDate: checkIn,
        checkOutDate: checkOut,
        adults: Number(guests || 2),
        children: 0,
        firstName: firstName.trim(),
        lastName: lastName.trim() || 'Guest',
        email: email.trim(),
        phone: phone.trim(),
        specialRequests: `${includeBreakfast ? '[Breakfast Included] ' : ''}${note.trim()}`,
      };

      const result = await createDirectBooking(payload);
      setBookingSuccess(result);
    } catch (err) {
      setBookingError(err.message || 'Failed to submit reservation. Please try WhatsApp booking.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // WhatsApp Message Generator
  const handleWhatsAppRedirect = (e) => {
    e.preventDefault();
    const guestName = `${firstName} ${lastName}`.trim() || 'Guest';
    const message = `Hi Paradise Bungalow!%0A%0AI would like to make a reservation:%0A- *Room:* ${activeRoom.title}%0A- *Check-in:* ${checkIn}%0A- *Check-out:* ${checkOut} (${nights} nights)%0A- *Guests:* ${guests}%0A- *Breakfast:* ${includeBreakfast ? 'Yes (+US$5/night)' : 'No (Room Only)'}%0A- *Guest Name:* ${guestName}%0A${email ? `- *Email:* ${email}%0A` : ''}${phone ? `- *Phone:* ${phone}%0A` : ''}${note ? `- *Special Requests:* ${note}%0A` : ''}%0A*Estimated Total:* US$${totalPrice}%0A%0APlease confirm availability.`;

    window.open(`https://wa.me/${PROPERTY_DETAILS.phoneClean}?text=${message}`, '_blank');
  };

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
        <div className="bg-gradient-to-r from-emerald-950 to-emerald-900 text-white p-5 sm:p-6 flex items-start justify-between relative">
          <div>
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Zap className="w-3.5 h-3.5 fill-amber-400" />
              Direct Reservation Engine
            </div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold">
              Reserve at Paradise Bungalow
            </h2>
            <p className="text-stone-300 text-xs mt-0.5">
              Guaranteed Best Rates · 0% Booking Fee · Free Cancellation
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

        {/* 3 Tabs: Direct (Default), WhatsApp, OTAs & Email */}
        <div className="flex border-b border-stone-200 bg-stone-50 text-xs sm:text-sm">
          <button
            onClick={() => setActiveTab('direct')}
            className={`flex-1 py-3 px-2 sm:px-4 font-bold flex items-center justify-center gap-1.5 sm:gap-2 border-b-2 transition-all ${
              activeTab === 'direct'
                ? 'border-emerald-900 text-emerald-950 bg-white shadow-xs'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
            <span className="whitespace-nowrap">Instant Direct Booking (HMS)</span>
          </button>

          <button
            onClick={() => setActiveTab('whatsapp')}
            className={`flex-1 py-3 px-2 sm:px-4 font-bold flex items-center justify-center gap-1.5 sm:gap-2 border-b-2 transition-all ${
              activeTab === 'whatsapp'
                ? 'border-emerald-900 text-emerald-950 bg-white shadow-xs'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <PhoneCall className="w-4 h-4 text-[#25D366] shrink-0" />
            <span className="whitespace-nowrap">WhatsApp Direct</span>
          </button>

          <button
            onClick={() => setActiveTab('otas')}
            className={`flex-1 py-3 px-2 sm:px-4 font-bold flex items-center justify-center gap-1.5 sm:gap-2 border-b-2 transition-all ${
              activeTab === 'otas'
                ? 'border-emerald-900 text-emerald-950 bg-white shadow-xs'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Globe className="w-4 h-4 text-blue-600 shrink-0" />
            <span className="whitespace-nowrap">OTAs &amp; Email</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto custom-modal-scrollbar space-y-4">
          
          {/* ================================================================= */}
          {/* TAB 1: Instant Direct Booking via HMS API                         */}
          {/* ================================================================= */}
          {activeTab === 'direct' && (
            <div>
              {bookingSuccess ? (
                <div className="p-6 text-center space-y-4 animate-fade-in">
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-inner">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-emerald-950">
                    Booking Request Confirmed!
                  </h3>

                  <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 text-left text-xs sm:text-sm space-y-2">
                    <div className="flex justify-between">
                      <span className="text-stone-500">Booking Reference:</span>
                      <span className="font-mono font-bold text-emerald-900 text-sm">
                        {bookingSuccess.reservationNumber || 'RES-CONFIRMED'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-500">Room:</span>
                      <span className="font-bold text-emerald-950">{activeRoom.title}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-500">Stay Duration:</span>
                      <span className="font-medium text-stone-800">{checkIn} to {checkOut} ({nights} nights)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-500">Total Amount:</span>
                      <span className="font-extrabold text-amber-600 text-base">US${totalPrice}</span>
                    </div>
                  </div>

                  <p className="text-xs text-stone-600">
                    An email confirmation has been sent to <strong>{email}</strong>. The hotel team will confirm your arrival details shortly.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <a
                      href={`https://wa.me/${PROPERTY_DETAILS.phoneClean}?text=Hi!%20I%20just%20booked%20reference%20${bookingSuccess.reservationNumber || ''}%20for%20${activeRoom.title}.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-3 rounded-full text-xs font-bold text-white bg-[#25D366] hover:bg-[#1eb956] transition-colors flex items-center justify-center gap-1.5"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>Chat on WhatsApp</span>
                    </a>
                    <button
                      onClick={onClose}
                      className="px-6 py-3 rounded-full text-xs font-bold text-emerald-950 bg-stone-100 hover:bg-stone-200 transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleDirectBookingSubmit} className="space-y-4">
                  {bookingError && (
                    <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{bookingError}</span>
                    </div>
                  )}

                  {/* Room Picker */}
                  <div>
                    <label className="block text-xs font-bold text-emerald-950 uppercase tracking-wider mb-1">
                      Select Room Type
                    </label>
                    <select
                      value={selectedRoomId}
                      onChange={(e) => setSelectedRoomId(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm text-stone-800 font-semibold focus:ring-2 focus:ring-amber-500 focus:outline-none bg-stone-50"
                    >
                      {ROOMS_DATA.map((r) => (
                        <option key={r.id} value={r.id}>
                          {r.title} — US${r.priceOnly}/night (Sleeps {r.maxGuests})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Dates & Guests */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-emerald-950 uppercase tracking-wider mb-1">
                        Check-in Date
                      </label>
                      <input
                        type="date"
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm text-stone-800 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-emerald-950 uppercase tracking-wider mb-1">
                        Check-out Date
                      </label>
                      <input
                        type="date"
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm text-stone-800 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-emerald-950 uppercase tracking-wider mb-1">
                        Guests
                      </label>
                      <select
                        value={guests}
                        onChange={(e) => setGuests(parseInt(e.target.value))}
                        className="w-full p-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm text-stone-800 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                      >
                        {[1, 2, 3, 4].map((num) => (
                          <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Breakfast Option */}
                  <div 
                    onClick={() => setIncludeBreakfast(!includeBreakfast)}
                    className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      includeBreakfast 
                        ? 'bg-amber-50 border-amber-400 text-amber-950 shadow-xs' 
                        : 'bg-stone-50 border-stone-200 text-stone-600'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Coffee className="w-4 h-4 text-amber-600" />
                      <div>
                        <div className="font-bold text-xs sm:text-sm text-emerald-950">
                          Include Exceptional Breakfast
                        </div>
                        <div className="text-[11px] text-stone-500">
                          Fresh tropical fruits, eggs, Sri Lankan tea & coffee (+US$5/night)
                        </div>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={includeBreakfast}
                      onChange={(e) => setIncludeBreakfast(e.target.checked)}
                      className="w-4 h-4 accent-emerald-900 rounded cursor-pointer"
                    />
                  </div>

                  {/* Guest Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-emerald-950 uppercase tracking-wider mb-1">
                        First Name *
                      </label>
                      <input
                        type="text"
                        placeholder="John"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm text-stone-800 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-emerald-950 uppercase tracking-wider mb-1">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        placeholder="Doe"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm text-stone-800 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-emerald-950 uppercase tracking-wider mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        placeholder="john@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm text-stone-800 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-emerald-950 uppercase tracking-wider mb-1">
                        WhatsApp / Phone Number *
                      </label>
                      <input
                        type="tel"
                        placeholder="+94 77 123 4567"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm text-stone-800 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                        required
                      />
                    </div>
                  </div>

                  {/* Special Requests */}
                  <div>
                    <label className="block text-[11px] font-bold text-emerald-950 uppercase tracking-wider mb-1">
                      Special Requests / Notes
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Airport shuttle pickup, late check-in"
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm text-stone-800 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>

                  {/* Price Banner */}
                  <div className="bg-emerald-950 text-white p-4 rounded-2xl flex items-center justify-between shadow-md">
                    <div>
                      <div className="text-xs text-emerald-300">
                        Total for {nights} Night{nights > 1 ? 's' : ''}
                      </div>
                      <div className="text-xs text-amber-400 font-semibold">
                        {includeBreakfast ? '✓ Breakfast Included' : 'Room Only'} · Direct Rate Guarantee
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-extrabold text-amber-300 leading-none">
                        US${totalPrice}
                      </div>
                      <span className="text-[10px] text-emerald-400 font-medium">Pay at property · No card required</span>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-full text-sm font-bold text-white bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-900 hover:from-emerald-800 hover:to-emerald-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/20 disabled:opacity-50 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
                        <span>Submitting Reservation to HMS...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 text-amber-400" />
                        <span>Confirm Direct Booking</span>
                      </>
                    )}
                  </button>

                  <div className="text-center pt-1">
                    <a
                      href={HMS_CONFIG.BOOKING_ENGINE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-stone-500 hover:text-emerald-900 underline underline-offset-2 transition-colors"
                    >
                      <span>Prefer booking on our standalone HMS engine? Click here</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* ================================================================= */}
          {/* TAB 2: WhatsApp Instant Booking                                   */}
          {/* ================================================================= */}
          {activeTab === 'whatsapp' && (
            <form onSubmit={handleWhatsAppRedirect} className="space-y-4">
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200/80 text-xs text-emerald-950 flex items-start gap-2.5">
                <PhoneCall className="w-4 h-4 text-[#25D366] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-emerald-900">Direct Host Connection</strong>
                  Message the property manager directly on WhatsApp with your requested dates. Instant responses for surf reports, airport shuttles, and special requests!
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-emerald-950 uppercase tracking-wider mb-1">
                  Selected Room
                </label>
                <select
                  value={selectedRoomId}
                  onChange={(e) => setSelectedRoomId(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm text-stone-800 font-semibold bg-stone-50"
                >
                  {ROOMS_DATA.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.title} (US${r.priceOnly}/night)
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-emerald-950 uppercase tracking-wider mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm text-stone-800"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-emerald-950 uppercase tracking-wider mb-1">
                    Stay Duration
                  </label>
                  <div className="text-xs p-2.5 bg-stone-100 rounded-xl font-medium text-stone-700">
                    {checkIn} to {checkOut} ({nights} nights)
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-full text-sm font-bold text-white bg-[#25D366] hover:bg-[#1eb956] transition-colors flex items-center justify-center gap-2 shadow-lg shadow-green-900/20 cursor-pointer"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Open WhatsApp & Send Reservation</span>
              </button>
            </form>
          )}

          {/* ================================================================= */}
          {/* TAB 3: OTAs & Email                                              */}
          {/* ================================================================= */}
          {activeTab === 'otas' && (
            <div className="space-y-4">
              <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-950">
                <strong>Direct Rate Guarantee:</strong> Booking directly through our HMS engine guarantees the lowest price with 0% middleman fees. If you prefer using your existing OTA accounts or sending an email inquiry, choose below:
              </div>

              <div className="space-y-3">
                <a
                  href={PROPERTY_DETAILS.bookingComUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full p-4 rounded-2xl bg-[#003580] hover:bg-[#00255a] text-white flex items-center justify-between transition-all shadow-md group"
                >
                  <div className="flex items-center gap-3">
                    <Building2 className="w-5 h-5" />
                    <div className="text-left">
                      <div className="font-bold text-sm">Booking.com</div>
                      <div className="text-[11px] text-blue-200">View listing, official photos & verified guest reviews</div>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-blue-200 group-hover:text-white" />
                </a>

                <a
                  href={PROPERTY_DETAILS.airbnbUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full p-4 rounded-2xl bg-[#FF5A5F] hover:bg-[#e0484d] text-white flex items-center justify-between transition-all shadow-md group"
                >
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5" />
                    <div className="text-left">
                      <div className="font-bold text-sm">Airbnb Listing</div>
                      <div className="text-[11px] text-rose-100">Superhost profile & long-term accommodation bookings</div>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-rose-100 group-hover:text-white" />
                </a>

                <a
                  href={`mailto:${PROPERTY_DETAILS.email}?subject=Reservation%20Inquiry%20-%20${encodeURIComponent(activeRoom.title)}`}
                  className="w-full p-4 rounded-2xl bg-stone-100 hover:bg-stone-200 text-stone-800 flex items-center justify-between transition-all border border-stone-300 group"
                >
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-emerald-800" />
                    <div className="text-left">
                      <div className="font-bold text-sm">Email Property Desk</div>
                      <div className="text-[11px] text-stone-500">{PROPERTY_DETAILS.email}</div>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-stone-400 group-hover:text-stone-800" />
                </a>
              </div>
            </div>
          )}

          {/* Payment Badges */}
          <div className="pt-3 border-t border-stone-200 text-center">
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block mb-1.5">
              Direct Booking Perks &amp; Payment Options
            </span>
            <div className="flex flex-wrap items-center justify-center gap-1.5 text-[11px] font-semibold text-stone-700">
              <span className="px-2.5 py-1 rounded-md bg-stone-100 border border-stone-200 text-emerald-950 flex items-center gap-1">
                <CreditCard className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                Visa / Mastercard
              </span>
              <span className="px-2.5 py-1 rounded-md bg-stone-100 border border-stone-200 text-emerald-950 flex items-center gap-1">
                <Banknote className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                Cash at Check-in
              </span>
              <span className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                0% Extra Commission
              </span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
