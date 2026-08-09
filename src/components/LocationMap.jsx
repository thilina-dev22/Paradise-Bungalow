import React, { useState } from 'react';
import { MapPin, Phone, Mail, ExternalLink, Navigation, Compass, Utensils, Waves, TreePine, Train, Plane, HelpCircle, ChevronDown, ChevronUp, ShieldCheck } from 'lucide-react';
import { PROPERTY_DETAILS, SURROUNDINGS_DATA, HOUSE_RULES, FAQS_DATA } from '../data/roomsData';

export default function LocationMap() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <section id="location" className="py-20 bg-gradient-to-b from-stone-50 via-stone-100 to-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-20">
        
        {/* Map & Main Location Block */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/15 text-amber-800 text-xs font-bold uppercase tracking-wider mb-3 border border-amber-500/30">
              <MapPin className="w-3.5 h-3.5" /> Prime Midigama Location
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-emerald-950 mb-3">
              Where to Find Paradise
            </h2>
            <p className="text-sm sm:text-base text-stone-600">
              Located in Midigama, just 50 meters (1 min walk) from Midigama Beach &amp; the famous Lazy Right surf break, and 4.5 km from Weligama town centre.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Contact Info Card */}
            <div className="lg:col-span-5 bg-gradient-to-br from-emerald-950 to-emerald-900 text-white p-8 sm:p-10 rounded-3xl shadow-xl shadow-emerald-950/20 flex flex-col justify-between">
              <div>
                <span className="text-amber-400 text-xs font-bold uppercase tracking-widest block mb-2">
                  Reach Out Directly
                </span>
                <h3 className="font-serif text-3xl font-bold text-white mb-6">
                  Paradise Bungalow
                </h3>

                <div className="space-y-5 mb-8">
                  <a
                    href={`tel:${PROPERTY_DETAILS.phoneClean}`}
                    className="flex items-center gap-4 hover:text-amber-300 transition-colors group"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-amber-500/20 flex items-center justify-center text-amber-400 shrink-0 group-hover:bg-amber-500/30">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-stone-300">Phone & WhatsApp</div>
                      <div className="text-base font-bold">{PROPERTY_DETAILS.phone}</div>
                    </div>
                  </a>

                  <a
                    href={`mailto:${PROPERTY_DETAILS.email}`}
                    className="flex items-center gap-4 hover:text-amber-300 transition-colors group"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-amber-500/20 flex items-center justify-center text-amber-400 shrink-0 group-hover:bg-amber-500/30">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-stone-300">Official Email</div>
                      <div className="text-base font-bold">{PROPERTY_DETAILS.email}</div>
                    </div>
                  </a>

                  <a
                    href={PROPERTY_DETAILS.googleMapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 hover:text-amber-300 transition-colors group"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-amber-500/20 flex items-center justify-center text-amber-400 shrink-0 group-hover:bg-amber-500/30">
                      <Navigation className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-stone-300">Exact Google Maps Pinpoint</div>
                      <div className="text-base font-bold flex items-center gap-1.5">
                        <span>Open Map Location</span>
                        <ExternalLink className="w-4 h-4" />
                      </div>
                    </div>
                  </a>
                </div>
              </div>

              <div className="pt-6 border-t border-emerald-800/60">
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={PROPERTY_DETAILS.bookingComUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 rounded-full text-xs font-bold text-center text-white bg-[#003580] hover:bg-[#00255a] transition-colors flex items-center justify-center gap-1.5 shadow-md"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Booking.com Listing</span>
                  </a>
                  <a
                    href={PROPERTY_DETAILS.airbnbUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 rounded-full text-xs font-bold text-center text-white bg-[#FF5A5F] hover:bg-[#e0484d] transition-colors flex items-center justify-center gap-1.5 shadow-md"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Airbnb Listing</span>
                  </a>
                </div>
              </div>

            </div>

            {/* Interactive Map Embed Container with Exact Coordinates Pinpoint */}
            <div className="lg:col-span-7 rounded-3xl overflow-hidden shadow-xl border border-stone-300 relative min-h-[420px] bg-stone-200">
              <iframe
                title="Paradise Bungalow Midigama Exact Google Maps Location"
                src="https://maps.google.com/maps?q=5.9665443,80.38872&t=&z=17&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0 min-h-[420px]"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl flex items-center justify-between shadow-lg border border-stone-200">
                <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-emerald-950">
                  <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
                  Paradise Bungalow · Midigama (Exact Pin)
                </div>
                <a
                  href={PROPERTY_DETAILS.googleMapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1"
                >
                  <span>Open in Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* Hotel Surroundings & Distances */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/15 text-amber-800 text-xs font-bold uppercase tracking-wider mb-3 border border-amber-500/30">
              <Compass className="w-3.5 h-3.5" /> Hotel Surroundings
            </span>
            <h2 className="font-serif text-3xl font-bold text-emerald-950 mb-2">
              Beaches, Dining & Local Spots
            </h2>
            <p className="text-sm text-stone-600">
              Explore nearby beaches, top restaurants, regional attractions, and transport hubs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Beaches */}
            <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-md">
              <div className="flex items-center gap-2 text-emerald-950 font-serif font-bold text-lg mb-4 pb-2 border-b border-stone-100">
                <Waves className="w-5 h-5 text-amber-500" />
                <span>Nearby Beaches</span>
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-stone-600">
                {SURROUNDINGS_DATA.beaches.map((b, idx) => (
                  <li key={idx} className="flex justify-between items-center">
                    <span className="font-semibold text-emerald-950">{b.name}</span>
                    <span className="text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded text-[11px]">{b.distance}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Restaurants */}
            <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-md">
              <div className="flex items-center gap-2 text-emerald-950 font-serif font-bold text-lg mb-4 pb-2 border-b border-stone-100">
                <Utensils className="w-5 h-5 text-amber-500" />
                <span>Restaurants & Cafes</span>
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-stone-600">
                {SURROUNDINGS_DATA.restaurants.map((r, idx) => (
                  <li key={idx} className="flex justify-between items-center">
                    <span className="font-semibold text-emerald-950">{r.name}</span>
                    <span className="text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded text-[11px]">{r.distance}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Attractions */}
            <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-md">
              <div className="flex items-center gap-2 text-emerald-950 font-serif font-bold text-lg mb-4 pb-2 border-b border-stone-100">
                <TreePine className="w-5 h-5 text-amber-500" />
                <span>Attractions & Nature</span>
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-stone-600">
                {SURROUNDINGS_DATA.attractions.map((a, idx) => (
                  <li key={idx} className="flex justify-between items-center">
                    <span className="font-semibold text-emerald-950">{a.name}</span>
                    <span className="text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded text-[11px]">{a.distance}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Transport & Airports */}
            <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-md">
              <div className="flex items-center gap-2 text-emerald-950 font-serif font-bold text-lg mb-4 pb-2 border-b border-stone-100">
                <Train className="w-5 h-5 text-amber-500" />
                <span>Transport & Airports</span>
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-stone-600">
                {SURROUNDINGS_DATA.transport.map((t, idx) => (
                  <li key={idx} className="flex justify-between items-center">
                    <span className="font-semibold text-emerald-950">{t.name}</span>
                    <span className="text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded text-[11px]">{t.distance}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

        {/* House Rules & Policies Card */}
        <div className="bg-white p-8 sm:p-10 rounded-3xl border border-stone-200 shadow-xl">
          <h3 className="font-serif text-2xl font-bold text-emerald-950 mb-6 flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-amber-500" />
            <span>Paradise Bungalow House Rules & Policies</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-xs sm:text-sm">
            <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200">
              <span className="font-bold text-emerald-950 block mb-1">Check-in & Check-out</span>
              <p className="text-stone-600">Check-in: {HOUSE_RULES.checkIn}</p>
              <p className="text-stone-600">Check-out: {HOUSE_RULES.checkOut}</p>
            </div>

            <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200">
              <span className="font-bold text-emerald-950 block mb-1">Children & Beds</span>
              <p className="text-stone-600">{HOUSE_RULES.children}</p>
              <p className="text-stone-400 mt-1">{HOUSE_RULES.cots}</p>
            </div>

            <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200">
              <span className="font-bold text-emerald-950 block mb-1">Pets & Restrictions</span>
              <p className="text-stone-600">{HOUSE_RULES.pets}</p>
              <p className="text-stone-600">Non-smoking in all indoor rooms.</p>
            </div>

            <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200">
              <span className="font-bold text-emerald-950 block mb-1">Accepted Payment Methods</span>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {HOUSE_RULES.paymentMethods.map((m, idx) => (
                  <span key={idx} className="bg-emerald-900 text-white text-[11px] font-bold px-2 py-0.5 rounded">
                    {m}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* FAQs Accordion Section */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/15 text-amber-800 text-xs font-bold uppercase tracking-wider mb-3 border border-amber-500/30">
              <HelpCircle className="w-3.5 h-3.5" /> Frequently Asked Questions
            </span>
            <h2 className="font-serif text-3xl font-bold text-emerald-950">
              Paradise Bungalow FAQs
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {FAQS_DATA.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm transition-all"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-5 text-left font-serif text-base font-bold text-emerald-950 flex justify-between items-center hover:bg-stone-50 transition-colors"
                >
                  <span>{faq.q}</span>
                  {openFaq === idx ? <ChevronUp className="w-5 h-5 text-amber-600 shrink-0" /> : <ChevronDown className="w-5 h-5 text-stone-400 shrink-0" />}
                </button>

                {openFaq === idx && (
                  <div className="p-5 pt-0 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-100 bg-stone-50/50">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
