import React from 'react';
import { Wifi, Coffee, Utensils, Flame, Trees, Car, Shield, Wind, Sparkles } from 'lucide-react';

const AMENITIES_LIST = [
  {
    icon: Wifi,
    title: 'Free High-Speed WiFi',
    desc: 'Uninterrupted optical fiber WiFi across all 8 rooms, cabanas, balconies, and garden dining areas.'
  },
  {
    icon: Coffee,
    title: 'Exceptional Breakfast',
    desc: 'Fresh tropical fruits, custom omelettes, Ceylon tea, coffee, and traditional Sri Lankan delicacies.'
  },
  {
    icon: Utensils,
    title: 'Private Kitchen Suites',
    desc: 'Superior Double Room features a fully equipped kitchen (stovetop, fridge, kettle, and kitchenware).'
  },
  {
    icon: Flame,
    title: 'Barbecue Facilities',
    desc: 'Outdoor barbecue equipment and patio dining areas provided for evening garden dinners.'
  },
  {
    icon: Trees,
    title: 'Lush Tropical Gardens',
    desc: 'Surrounded by vibrant exotic flora, quiet sit-outs, and singing birds in a serene ecosystem.'
  },
  {
    icon: Wind,
    title: 'Air Conditioning & Fans',
    desc: 'Climate-controlled standard, family, and superior suites for your utmost comfort.'
  },
  {
    icon: Car,
    title: 'Free On-Site Parking',
    desc: 'Secure private parking on premises for vehicles, rental bikes, and tuk-tuks.'
  },
  {
    icon: Shield,
    title: 'Private Entrances & Safety',
    desc: 'Soundproofed walls, private entrances, mosquito netting, and 24/7 hospitality support.'
  }
];

export default function Amenities() {
  return (
    <section id="amenities" className="py-24 bg-emerald-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-400/15 text-amber-300 text-xs font-bold uppercase tracking-wider mb-4 border border-amber-400/25">
            <Sparkles className="w-3.5 h-3.5" /> World-Class Comforts
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-4">
            Property Highlights &amp; Amenities
          </h2>
          <div className="flex items-center justify-center gap-4 mb-5">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-amber-400/50" />
            <div className="w-1.5 h-1.5 rounded-full bg-amber-400/70" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-amber-400/50" />
          </div>
          <p className="text-sm sm:text-base text-stone-300/80">
            Everything you need for a restful tropical vacation, whether you are seeking quiet work, family fun, or romantic relaxation.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {AMENITIES_LIST.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <div
                key={idx}
                className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:bg-white/10 hover:border-amber-400/30 transition-all duration-300 group"
              >
                <div className="w-11 h-11 rounded-xl bg-amber-400/15 flex items-center justify-center mb-5 text-amber-400 group-hover:bg-amber-400/25 transition-colors">
                  <IconComp className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-base font-bold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-stone-300/70 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
