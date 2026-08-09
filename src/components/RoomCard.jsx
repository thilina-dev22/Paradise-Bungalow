import React, { useState } from 'react';
import { Users, Maximize2, Bed, Coffee, Check, Eye, Info, MapPin, CheckCircle2 } from 'lucide-react';

const getShortBedText = (bedConfig) => {
  if (!bedConfig) return '';
  if (bedConfig.includes('Extra-Large Double')) {
    return bedConfig.replace('1 Extra-Large Double Bed', '1 King Bed').replace('Extra-Large Double', 'King');
  }
  if (bedConfig.includes('Flexible Bedding')) {
    return 'Family Bedding';
  }
  return bedConfig;
};

export default function RoomCard({ room, onSelectRoom, onViewDetails }) {
  const [includeBreakfast, setIncludeBreakfast] = useState(false);

  const price = includeBreakfast ? room.priceBreakfast : room.priceOnly;
  const originalPrice = includeBreakfast ? room.originalPriceBreakfast : room.originalPriceOnly;

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md shadow-emerald-950/8 border border-stone-200/60 flex flex-col h-full hover:shadow-2xl hover:shadow-emerald-950/10 hover:-translate-y-1.5 transition-all duration-400 group">
      
      {/* Thumbnail Container */}
      <div 
        className="relative h-56 sm:h-60 overflow-hidden cursor-pointer bg-emerald-950" 
        onClick={() => onViewDetails(room)}
      >
        <img
          src={room.images[0]}
          alt={room.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        {/* Subtle vignette overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/40 via-transparent to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          <span className="bg-emerald-950/85 backdrop-blur-md text-amber-300 text-[11px] font-bold px-3 py-1 rounded-full border border-amber-400/25 shadow-lg tracking-wide uppercase">
            {room.badge}
          </span>
          {room.count && (
            <span className="bg-white/15 backdrop-blur-sm text-white text-[10px] font-semibold px-2.5 py-0.5 rounded-full w-max shadow-sm border border-white/20">
              {room.count} {room.count === 1 ? 'Unit' : 'Units'}
            </span>
          )}
        </div>

        {/* Photo Count */}
        <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white text-[11px] font-semibold px-2.5 py-1 rounded-lg flex items-center gap-1.5">
          <Eye className="w-3.5 h-3.5 text-amber-400" />
          <span>{room.images.length} Photos</span>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-5 sm:p-6 flex flex-col flex-grow">
        
        {/* Title & Location Tag */}
        <div className="mb-4">
          <h3 className="font-serif text-xl font-bold text-emerald-950 leading-snug mb-2 group-hover:text-emerald-800 transition-colors">
            {room.title}
          </h3>
          {room.locationNote && (
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-lg mb-2 border border-amber-200/80">
              <MapPin className="w-3 h-3 shrink-0" />
              {room.locationNote}
            </span>
          )}
          <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
            {room.subtitle}
          </p>
        </div>

        {/* Specs Grid */}
        <div className="grid grid-cols-3 gap-1 bg-stone-50 p-2.5 rounded-xl text-center text-xs text-emerald-950 font-semibold mb-4 border border-stone-200/80">
          <div className="flex flex-col items-center justify-center gap-1 min-w-0 px-1">
            <Maximize2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <div className="text-stone-700 text-[11px] truncate w-full">{room.size}</div>
          </div>
          <div className="flex flex-col items-center justify-center gap-1 border-x border-stone-200 min-w-0 px-1">
            <Users className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <div className="text-stone-700 text-[11px] truncate w-full">Sleeps {room.maxGuests}</div>
          </div>
          <div className="flex flex-col items-center justify-center gap-1 min-w-0 px-1">
            <Bed className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <div className="text-stone-700 text-[10px] leading-tight text-center truncate w-full" title={room.bedConfig}>
              {getShortBedText(room.bedConfig)}
            </div>
          </div>
        </div>

        {/* Highlights */}
        <ul className="grid grid-cols-2 gap-1.5 text-[11px] text-stone-600 mb-4">
          {room.highlights.slice(0, 4).map((hl, idx) => (
            <li key={idx} className="flex items-start gap-1.5">
              <Check className="w-3 h-3 text-emerald-500 shrink-0 mt-0.5" />
              <span className="leading-tight">{hl}</span>
            </li>
          ))}
        </ul>

        <div className="border-t border-dashed border-stone-200 mb-4" />

        {/* Breakfast Checkbox Option */}
        <div 
          onClick={() => setIncludeBreakfast(!includeBreakfast)}
          className={`flex items-center justify-between p-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer mb-5 ${
            includeBreakfast 
              ? 'bg-amber-50 border-amber-300 text-amber-950 shadow-sm' 
              : 'bg-stone-50 border-stone-200 text-stone-600 hover:border-amber-200 hover:bg-amber-50/40'
          }`}
        >
          <div className="flex items-center gap-2">
            <Coffee className={`w-3.5 h-3.5 ${includeBreakfast ? 'text-amber-600' : 'text-stone-400'}`} />
            <span>Add Exceptional Breakfast</span>
          </div>
          <input
            type="checkbox"
            checked={includeBreakfast}
            onChange={(e) => setIncludeBreakfast(e.target.checked)}
            className="w-4 h-4 accent-emerald-800 rounded cursor-pointer"
          />
        </div>

        {/* Price & Action Row */}
        <div className="flex items-end justify-between gap-2 mt-auto">
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-xs text-stone-400 line-through">
                US${originalPrice}
              </span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold border border-emerald-200">
                12% Off
              </span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-extrabold text-emerald-950">
                US${price}
              </span>
              <span className="text-xs text-stone-400">/ night</span>
            </div>
            <span className="inline-flex items-center gap-1 text-[11px] text-emerald-600 font-semibold mt-0.5">
              <CheckCircle2 className="w-3 h-3" />
              Free Cancellation
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onViewDetails(room)}
              className="p-2.5 rounded-full border border-stone-200 text-stone-500 hover:border-emerald-900 hover:bg-emerald-900 hover:text-white transition-all"
              title="View Specs & Photos"
            >
              <Info className="w-4 h-4" />
            </button>

            <button
              onClick={() => onSelectRoom(room, includeBreakfast)}
              className="px-5 py-2.5 rounded-full text-xs font-bold text-white bg-emerald-900 hover:bg-emerald-800 transition-colors shadow-md shadow-emerald-900/20 hover:shadow-lg"
            >
              Book Now
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
