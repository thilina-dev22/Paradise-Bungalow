import React, { useState } from 'react';
import { X, Users, Maximize2, Bed, ChevronLeft, ChevronRight, PhoneCall, Calendar, MapPin, ExternalLink } from 'lucide-react';
import { PROPERTY_DETAILS } from '../data/roomsData';
import { BREAKFAST_PER_ADULT, displayRate, breakfastSupplement, seasonRates } from '../data/pricing';
import { useCurrency } from '../context/currency';
import FitImage from './FitImage';
import AmenityIcon from './AmenityIcon';
import useModalBehavior from '../hooks/useModalBehavior';

export default function RoomModal({ room, onClose, onOpenBooking }) {
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [withBreakfast, setWithBreakfast] = useState(false);
  const currentMonth = new Date().getMonth();
  const { format } = useCurrency();
  useModalBehavior(onClose);

  if (!room) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-emerald-950/85 backdrop-blur-md flex items-end sm:items-center justify-center sm:p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={room.title}
    >
      <div 
        className="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-4xl max-h-[94dvh] sm:max-h-[90vh] overflow-hidden flex flex-col relative shadow-2xl animate-sheet-up border border-stone-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="overflow-y-auto custom-modal-scrollbar flex-grow relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 bg-emerald-950/80 hover:bg-emerald-950 text-white rounded-full p-2 backdrop-blur-sm transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Gallery Slider */}
        <div className="relative bg-emerald-950">
          <FitImage
            src={room.images[activeImgIndex]}
            alt={room.title}
            className="h-72 sm:h-[26rem]"
            priority
          />

          {room.images.length > 1 && (
            <>
              <button
                onClick={() => setActiveImgIndex((prev) => (prev === 0 ? room.images.length - 1 : prev - 1))}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-emerald-950 p-2 rounded-full shadow-md"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={() => setActiveImgIndex((prev) => (prev + 1) % room.images.length)}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-emerald-950 p-2 rounded-full shadow-md"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Dots Indicator */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 bg-black/50 px-3 py-1.5 rounded-full backdrop-blur-sm">
                {room.images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImgIndex(idx)}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      idx === activeImgIndex ? 'bg-amber-400 w-5' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Modal Details Body */}
        <div className="p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
            <div>
              <span className="inline-block bg-amber-500/15 text-amber-700 font-bold text-xs px-3 py-1 rounded-full mb-2 border border-amber-500/30">
                {room.badge}
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-emerald-950 leading-tight">
                {room.title}
              </h2>
              {room.locationNote && (
                <p className="text-xs font-semibold text-amber-700 mt-1 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-amber-600 shrink-0" />
                  <span>{room.locationNote}</span>
                </p>
              )}
            </div>

            <div className="sm:text-right">
              <span className="text-xs text-stone-600 block">
                {displayRate(room).isCurrentMonth ? `${displayRate(room).month.label} rate` : 'From'}
              </span>
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-950">
                {format(displayRate(room).amount)} <span className="text-sm font-normal text-stone-500">/ night</span>
              </div>
              <span className="text-xs text-emerald-600 font-semibold block">
                Breakfast +{format(BREAKFAST_PER_ADULT)} per adult
              </span>
            </div>
          </div>

          {/* Seasonal Rates */}
          <div className="mb-6">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
              <h3 className="font-serif text-lg font-bold text-emerald-950">Rates by Season</h3>
              <div className="inline-flex rounded-full bg-stone-100 p-0.5 text-xs font-bold" role="group" aria-label="Meal plan">
                {[
                  { value: false, label: 'Room only' },
                  { value: true, label: 'With breakfast' },
                ].map((opt) => (
                  <button
                    key={opt.label}
                    type="button"
                    aria-pressed={withBreakfast === opt.value}
                    onClick={() => setWithBreakfast(opt.value)}
                    className={`px-3.5 py-1.5 rounded-full transition-colors ${
                      withBreakfast === opt.value ? 'bg-emerald-900 text-white shadow' : 'text-stone-600 hover:text-emerald-950'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {seasonRates(room).map((season) => {
                const isNow = season.months.some((m) => m.index === currentMonth);
                const isPeak = season.season === 'peak';
                const amount = season.amount + (withBreakfast ? breakfastSupplement(room.maxGuests) : 0);
                return (
                  <div
                    key={season.season}
                    className={`rounded-2xl border p-4 ${
                      isPeak ? 'bg-emerald-950 border-emerald-950 text-white' : 'bg-stone-50 border-stone-200 text-emerald-950'
                    } ${isNow ? 'ring-2 ring-amber-400 ring-offset-2' : ''}`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className={`text-[11px] font-bold uppercase tracking-wider ${isPeak ? 'text-amber-300' : 'text-amber-700'}`}>
                        {season.label}
                      </span>
                      {isNow && (
                        <span className="text-[10px] font-bold bg-amber-400 text-emerald-950 rounded-full px-2 py-0.5">Now</span>
                      )}
                    </div>
                    <div className="mt-2 font-serif text-2xl font-semibold leading-none">
                      {format(amount)}
                      <span className={`ml-1 font-sans text-xs font-normal ${isPeak ? 'text-white/60' : 'text-stone-500'}`}>/ night</span>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-1">
                      {season.months.map((m) => (
                        <span
                          key={m.key}
                          className={`text-[10px] font-semibold rounded-md px-1.5 py-0.5 ${
                            isPeak ? 'bg-white/10 text-white/80' : 'bg-white border border-stone-200 text-stone-600'
                          }`}
                        >
                          {m.short}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="text-[11px] text-stone-500 mt-2">
              Per room, per night. Breakfast is {format(BREAKFAST_PER_ADULT)} per adult (shown here for {room.maxGuests} adults).
            </p>
          </div>

          {/* Specs */}
          <div className="grid grid-cols-3 gap-3 bg-stone-100 p-4 rounded-2xl text-center text-xs sm:text-sm text-emerald-950 mb-6">
            <div>
              <Maximize2 className="w-4 h-4 text-emerald-700 mx-auto mb-1" />
              <div className="text-stone-500 text-[11px]">Size</div>
              <div className="font-bold">{room.size}</div>
            </div>
            <div>
              <Users className="w-4 h-4 text-emerald-700 mx-auto mb-1" />
              <div className="text-stone-500 text-[11px]">Capacity</div>
              <div className="font-bold">Sleeps {room.maxGuests}</div>
            </div>
            <div>
              <Bed className="w-4 h-4 text-emerald-700 mx-auto mb-1" />
              <div className="text-stone-500 text-[11px]">Bedding</div>
              <div className="font-bold text-xs">{room.bedConfig}</div>
            </div>
          </div>

          <p className="text-sm sm:text-base text-stone-600 leading-relaxed mb-6">
            {room.description}
          </p>

          <h3 className="font-serif text-lg sm:text-xl font-bold text-emerald-950 mb-4">
            Room Amenities & Specs Checklist
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-3 gap-y-3 text-xs sm:text-sm text-stone-700 mb-8">
            {room.amenities.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
                  <AmenityIcon label={item} className="w-4 h-4" />
                </span>
                <span>{item}</span>
              </div>
            ))}
          </div>

          {/* Action Footer */}
          <div className="flex flex-col sm:flex-row gap-3 justify-end pt-6 border-t border-stone-200">
            <a
              href={room.airbnbUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full text-sm font-bold text-[#FF385C] border border-[#FF385C]/40 hover:bg-[#FF385C] hover:text-white transition-colors flex items-center justify-center gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              <span>View on Airbnb</span>
            </a>

            <a
              href={`https://wa.me/${PROPERTY_DETAILS.phoneClean}?text=Hi!%20I%20am%20interested%20in%20booking%20the%20${encodeURIComponent(room.title)}.`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full text-sm font-bold text-white bg-[#13803f] hover:bg-[#0f6b34] transition-colors flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Inquire via WhatsApp</span>
            </a>

            <button
              onClick={() => {
                onClose();
                onOpenBooking(room);
              }}
              className="px-6 py-3 rounded-full text-sm font-bold text-white bg-emerald-900 hover:bg-emerald-800 transition-colors flex items-center justify-center gap-2 shadow-md"
            >
              <Calendar className="w-4 h-4 text-amber-400" />
              <span>Proceed to Book</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  </div>
);
}
