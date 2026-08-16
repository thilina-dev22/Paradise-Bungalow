import React, { useState } from 'react';
import { Calendar, Users, Sparkles, ArrowRight, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { checkRoomAvailability, HMS_CONFIG } from '../services/hmsApi';

export default function AvailabilityBar({ onSelectAvailableRoom }) {
  const todayStr = new Date().toISOString().split('T')[0];
  const tomorrowStr = new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0];

  const [checkIn, setCheckIn] = useState(todayStr);
  const [checkOut, setCheckOut] = useState(tomorrowStr);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);

  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const handleCheck = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const data = await checkRoomAvailability({
        checkInDate: checkIn,
        checkOutDate: checkOut,
        adults,
        children,
      });
      setResults(data);
    } catch (err) {
      setError('Unable to load live availability. You can book directly using the form below.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 -mt-10 sm:-mt-12 mb-12">
      <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-2xl shadow-emerald-950/15 border border-stone-200">
        
        <form onSubmit={handleCheck} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 items-end">
          {/* Check-In */}
          <div>
            <label className="block text-[11px] font-bold text-emerald-950 uppercase tracking-wider mb-1 flex items-center gap-1">
              <Calendar className="w-3 h-3 text-amber-600" /> Check-in Date
            </label>
            <input
              type="date"
              min={todayStr}
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-stone-200 text-xs sm:text-sm text-stone-800 focus:ring-2 focus:ring-amber-500 focus:outline-none bg-stone-50"
              required
            />
          </div>

          {/* Check-Out */}
          <div>
            <label className="block text-[11px] font-bold text-emerald-950 uppercase tracking-wider mb-1 flex items-center gap-1">
              <Calendar className="w-3 h-3 text-amber-600" /> Check-out Date
            </label>
            <input
              type="date"
              min={checkIn || todayStr}
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-stone-200 text-xs sm:text-sm text-stone-800 focus:ring-2 focus:ring-amber-500 focus:outline-none bg-stone-50"
              required
            />
          </div>

          {/* Adults */}
          <div>
            <label className="block text-[11px] font-bold text-emerald-950 uppercase tracking-wider mb-1 flex items-center gap-1">
              <Users className="w-3 h-3 text-emerald-700" /> Adults
            </label>
            <select
              value={adults}
              onChange={(e) => setAdults(parseInt(e.target.value))}
              className="w-full p-2.5 rounded-xl border border-stone-200 text-xs sm:text-sm text-stone-800 focus:ring-2 focus:ring-amber-500 focus:outline-none bg-stone-50"
            >
              {[1, 2, 3, 4].map((n) => (
                <option key={n} value={n}>{n} Adult{n > 1 ? 's' : ''}</option>
              ))}
            </select>
          </div>

          {/* Children */}
          <div>
            <label className="block text-[11px] font-bold text-emerald-950 uppercase tracking-wider mb-1 flex items-center gap-1">
              <Users className="w-3 h-3 text-emerald-700" /> Children
            </label>
            <select
              value={children}
              onChange={(e) => setChildren(parseInt(e.target.value))}
              className="w-full p-2.5 rounded-xl border border-stone-200 text-xs sm:text-sm text-stone-800 focus:ring-2 focus:ring-amber-500 focus:outline-none bg-stone-50"
            >
              {[0, 1, 2, 3].map((n) => (
                <option key={n} value={n}>{n} {n === 1 ? 'Child' : 'Children'}</option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-emerald-900 to-emerald-800 hover:from-emerald-800 hover:to-emerald-700 transition-all flex items-center justify-center gap-2 shadow-md shadow-emerald-950/20 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-amber-300" />
                  <span>Checking...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Check Availability</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Live Search Results Container */}
        {results && (
          <div className="mt-5 pt-5 border-t border-stone-200 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <div>
                <h3 className="font-serif text-base sm:text-lg font-bold text-emerald-950 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Available Rooms for {results.nights} Night{results.nights > 1 ? 's' : ''} ({checkIn} to {checkOut})
                </h3>
                <p className="text-xs text-stone-500">
                  Best direct rate guarantee · 0% commission · Free cancellation
                </p>
              </div>

              <a
                href={`${HMS_CONFIG.BOOKING_ENGINE_URL}?checkIn=${checkIn}&checkOut=${checkOut}&adults=${adults}&children=${children}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-900 hover:text-amber-600 transition-colors"
              >
                <span>Open Full Engine</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {results.availableRooms && results.availableRooms.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {results.availableRooms.map((rm) => (
                  <div
                    key={rm.roomTypeId}
                    className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 hover:border-emerald-700/50 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full">
                          {rm.availableCount} Unit{rm.availableCount > 1 ? 's' : ''} Left
                        </span>
                        <span className="text-xs font-bold text-emerald-950">
                          ${rm.nightlyRate}/nt
                        </span>
                      </div>
                      <h4 className="font-serif text-sm font-bold text-emerald-950">
                        {rm.name}
                      </h4>
                      <p className="text-[11px] text-stone-500 line-clamp-2 mt-1">
                        {rm.description}
                      </p>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-stone-200/80 flex items-center justify-between">
                      <div className="text-xs">
                        <span className="text-stone-400">Total:</span>{' '}
                        <span className="font-extrabold text-amber-600">${rm.totalForStay}</span>
                      </div>
                      <button
                        onClick={() => onSelectAvailableRoom({
                          ...rm,
                          checkIn,
                          checkOut,
                          adults,
                          children,
                        })}
                        className="px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-emerald-900 hover:bg-emerald-800 transition-colors shadow-sm"
                      >
                        Book Direct
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm flex items-center justify-between">
                <span>No rooms available for the exact criteria. Please try alternative dates or contact us on WhatsApp.</span>
              </div>
            )}
          </div>
        )}

        {error && (
          <div className="mt-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

      </div>
    </div>
  );
}
