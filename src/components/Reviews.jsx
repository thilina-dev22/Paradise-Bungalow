import React from 'react';
import { Star, Quote, Award } from 'lucide-react';
import { REVIEWS_DATA, PROPERTY_DETAILS } from '../data/roomsData';

export default function Reviews() {
  const displayedReviews = REVIEWS_DATA.map((r, i) => ({
        id: i,
        guestName: r.name,
        country: r.country,
        rating: r.rating <= 5 ? r.rating : Math.round(r.rating / 2),
        ratingOutOf10: r.rating <= 5 ? r.rating * 2 : r.rating,
        comment: r.comment,
        title: 'Exceptional Stay',
        createdAt: r.date,
      }));

  const ratingScore = PROPERTY_DETAILS.rating.toFixed(1);
  const reviewCount = PROPERTY_DETAILS.reviewCount;

  return (
    <section id="reviews" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Score Header */}
        <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 rounded-3xl p-8 sm:p-12 text-white mb-12 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl shadow-emerald-950/10">
          <div>
            <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider mb-2">
              <Award className="w-4 h-4" /> Guest Reviews
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold">
              Exceptional Guest Experiences
            </h2>
            <p className="text-stone-300 text-sm sm:text-base mt-1">
              What guests say about their stay at Paradise Bungalow.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex items-center gap-4 bg-emerald-900/60 p-4 rounded-2xl border border-emerald-800/80">
              <div className="bg-gradient-to-br from-amber-400 to-amber-500 text-emerald-950 w-16 h-16 rounded-xl flex items-center justify-center text-3xl font-extrabold shadow-lg shadow-amber-500/20">
                {ratingScore}
              </div>
              <div>
                <div className="text-lg font-bold text-amber-300">
                  Exceptional
                </div>
                <div className="text-xs text-stone-300">
                  {reviewCount} Guest Reviews
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {displayedReviews.slice(0, 6).map((rev) => {
            const cardScore = rev.ratingOutOf10 ?? (rev.rating <= 5 ? rev.rating * 2 : rev.rating);
            let formattedDate = rev.createdAt || 'July 2026';
            if (typeof rev.createdAt === 'string' && rev.createdAt.includes('T')) {
              try {
                formattedDate = new Date(rev.createdAt).toLocaleDateString('en-US', {
                  month: 'long',
                  year: 'numeric',
                });
              } catch {
                formattedDate = rev.createdAt;
              }
            }

            return (
              <div
                key={rev.id}
                className="bg-stone-50 p-6 rounded-3xl border border-stone-200 flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < rev.rating
                              ? 'fill-amber-400 text-amber-400'
                              : 'fill-stone-200 text-stone-200'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="bg-emerald-900 text-amber-300 text-xs font-bold px-2.5 py-0.5 rounded-full border border-emerald-700">
                      {cardScore} / 10
                    </span>
                  </div>

                  <Quote className="w-8 h-8 text-amber-400/40 mb-2" />

                  {rev.title && (
                    <h4 className="font-serif font-bold text-sm text-emerald-950 mb-1">
                      {rev.title}
                    </h4>
                  )}

                  <p className="text-sm text-stone-600 italic leading-relaxed mb-6">
                    "{rev.comment}"
                  </p>

                  {rev.managerResponse && (
                    <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200/80 mb-4 text-xs text-emerald-950">
                      <span className="font-bold block text-emerald-800 mb-0.5">Response from Host:</span>
                      <span>{rev.managerResponse}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-stone-200/80 text-xs">
                  <div>
                    <div className="font-bold text-emerald-950">{rev.guestName || 'Verified Guest'}</div>
                    <div className="text-stone-400">{rev.country || 'International Traveler'}</div>
                  </div>
                  <div className="text-stone-400 font-medium">
                    {formattedDate}
                  </div>
                </div>
              </div>
            );
          })}
        </div>


      </div>
    </section>
  );
}
