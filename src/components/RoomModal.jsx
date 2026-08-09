import React, { useState } from 'react';
import { X, Check, Coffee, Users, Maximize2, Bed, ChevronLeft, ChevronRight, PhoneCall, Calendar } from 'lucide-react';
import { PROPERTY_DETAILS } from '../data/roomsData';

export default function RoomModal({ room, onClose, onOpenBooking }) {
  const [activeImgIndex, setActiveImgIndex] = useState(0);

  if (!room) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-emerald-950/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col relative shadow-2xl animate-fade-in border border-stone-200"
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
        <div className="relative h-72 sm:h-96 bg-emerald-950">
          <img
            src={room.images[activeImgIndex]}
            alt={room.title}
            className="w-full h-full object-cover"
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
                <p className="text-xs font-semibold text-amber-700 mt-1">
                  📌 {room.locationNote}
                </p>
              )}
            </div>

            <div className="sm:text-right">
              <span className="text-xs text-stone-400 line-through block">
                US${room.originalPriceOnly} Standard
              </span>
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-950">
                US${room.priceOnly} <span className="text-sm font-normal text-stone-500">/ night</span>
              </div>
              <span className="text-xs text-emerald-600 font-semibold block">
                +US$5 for Exceptional Breakfast
              </span>
            </div>
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

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-xs sm:text-sm text-stone-700 mb-8">
            {room.amenities.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          {/* Action Footer */}
          <div className="flex flex-col sm:flex-row gap-3 justify-end pt-6 border-t border-stone-200">
            <a
              href={`https://wa.me/${PROPERTY_DETAILS.phoneClean}?text=Hi!%20I%20am%20interested%20in%20booking%20the%20${encodeURIComponent(room.title)}.`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full text-sm font-bold text-white bg-[#25D366] hover:bg-[#1eb956] transition-colors flex items-center justify-center gap-2"
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
