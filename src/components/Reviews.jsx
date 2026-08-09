import React from 'react';
import { Star, Quote, Award } from 'lucide-react';
import { REVIEWS_DATA, PROPERTY_DETAILS } from '../data/roomsData';

export default function Reviews() {
  return (
    <section id="reviews" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Score Header */}
        <div className="bg-gradient-to-r from-emerald-950 to-emerald-900 rounded-3xl p-8 sm:p-12 text-white mb-16 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl shadow-emerald-950/10">
          <div>
            <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider mb-2">
              <Award className="w-4 h-4" /> Booking.com Verified Rating
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold">
              Exceptional Guest Experiences
            </h2>
            <p className="text-stone-300 text-sm sm:text-base mt-1">
              Based on verified traveler reviews for Paradise Bungalow.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-emerald-900/60 p-4 rounded-2xl border border-emerald-800/80">
            <div className="bg-gradient-to-br from-amber-400 to-amber-500 text-emerald-950 w-16 h-16 rounded-xl flex items-center justify-center text-3xl font-extrabold shadow-lg shadow-amber-500/20">
              {PROPERTY_DETAILS.rating}
            </div>
            <div>
              <div className="text-lg font-bold text-amber-300">
                Exceptional
              </div>
              <div className="text-xs text-stone-300">
                {PROPERTY_DETAILS.reviewCount}+ Verified Guest Reviews
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS_DATA.map((rev, idx) => (
            <div
              key={idx}
              className="bg-stone-50 p-6 rounded-3xl border border-stone-200 flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="bg-emerald-900 text-amber-300 text-xs font-bold px-2.5 py-0.5 rounded-full border border-emerald-700">
                    {rev.rating} / 10
                  </span>
                </div>

                <Quote className="w-8 h-8 text-amber-400/40 mb-2" />

                <p className="text-sm text-stone-600 italic leading-relaxed mb-6">
                  "{rev.comment}"
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-stone-200/80 text-xs">
                <div>
                  <div className="font-bold text-emerald-950">{rev.name}</div>
                  <div className="text-stone-400">{rev.country}</div>
                </div>
                <div className="text-stone-400 font-medium">{rev.date}</div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
