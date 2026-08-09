import React, { useState } from 'react';
import { Camera, X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

const GALLERY_ITEMS = [
  { src: '/images/IMG_8713.jpg', title: 'Paradise Bungalow Exterior', category: 'bungalow' },
  { src: '/images/IMG_8698.jpg', title: 'Superior Room & Private Kitchen', category: 'kitchen' },
  { src: '/images/IMG_8553.jpg', title: 'Eco Wooden Cabana', category: 'cabana' },
  { src: '/images/IMG_8580.jpg', title: 'Deluxe Balcony Suite', category: 'rooms' },
  { src: '/images/IMG_8592.jpg', title: 'Garden View Ground Room', category: 'rooms' },
  { src: '/images/IMG_8603.jpg', title: 'Family Bungalow Room', category: 'rooms' },
  { src: '/images/IMG_8716.jpg', title: 'Kitchenette & Cooking Essentials', category: 'kitchen' },
  { src: '/images/IMG_8720.jpg', title: 'Superior Balcony & Mountain Vistas', category: 'rooms' },
  { src: '/images/IMG_8565.jpg', title: 'Wooden Cabana Interior', category: 'cabana' },
  { src: '/images/IMG_8728.jpg', title: 'Living Lounge & Sofa Area', category: 'rooms' },
  { src: '/images/IMG_8576.jpg', title: 'Lush Tropical Garden Grounds', category: 'gardens' },
  { src: '/images/IMG_8635.jpg', title: 'Spacious Family Quad Suite', category: 'rooms' },
];

export default function Gallery() {
  const [filter, setFilter] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const filteredItems = filter === 'all' 
    ? GALLERY_ITEMS 
    : GALLERY_ITEMS.filter((item) => item.category === filter);

  return (
    <section id="gallery" className="py-20 bg-stone-100/70 border-t border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/15 text-amber-800 text-xs font-bold uppercase tracking-wider mb-3 border border-amber-500/30">
            <Camera className="w-3.5 h-3.5" /> Photo Gallery
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-emerald-950 mb-3">
            Explore Paradise Bungalow
          </h2>
          <p className="text-sm sm:text-base text-stone-600">
            A visual tour of our lush tropical grounds, rustic wooden cabanas, luxury balcony suites, and private kitchen spaces.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {[
            { id: 'all', label: 'All Photos' },
            { id: 'cabana', label: 'Wooden Cabanas' },
            { id: 'rooms', label: 'Suites & Rooms' },
            { id: 'kitchen', label: 'Private Kitchen' },
            { id: 'gardens', label: 'Gardens & Grounds' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${
                filter === tab.id
                  ? 'bg-emerald-900 text-white shadow-md shadow-emerald-900/20'
                  : 'bg-white text-emerald-950 border border-stone-300 hover:border-emerald-900/30'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredItems.map((item, idx) => (
            <div
              key={idx}
              onClick={() => setLightboxIndex(idx)}
              className="relative h-64 rounded-2xl overflow-hidden cursor-pointer group shadow-md hover:shadow-xl transition-all duration-300"
            >
              <img
                src={item.src}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <div className="text-white flex items-center justify-between w-full">
                  <span className="text-sm font-semibold truncate pr-2">{item.title}</span>
                  <Maximize2 className="w-4 h-4 text-amber-400 shrink-0" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Viewer */}
      {lightboxIndex !== null && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setLightboxIndex(null)}
        >
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-6 right-6 bg-white/20 hover:bg-white/30 text-white rounded-full p-3 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((prev) => (prev === 0 ? filteredItems.length - 1 : prev - 1));
            }}
            className="absolute left-4 sm:left-8 bg-white/20 hover:bg-white/30 text-white rounded-full p-3 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div className="max-w-4xl max-h-[85vh] text-center" onClick={(e) => e.stopPropagation()}>
            <img
              src={filteredItems[lightboxIndex].src}
              alt={filteredItems[lightboxIndex].title}
              className="max-w-full max-h-[75vh] rounded-2xl object-contain mx-auto shadow-2xl"
            />
            <div className="text-amber-400 mt-4 text-base font-bold">
              {filteredItems[lightboxIndex].title} ({lightboxIndex + 1} / {filteredItems.length})
            </div>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((prev) => (prev + 1) % filteredItems.length);
            }}
            className="absolute right-4 sm:right-8 bg-white/20 hover:bg-white/30 text-white rounded-full p-3 transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </section>
  );
}
