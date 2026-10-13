import React from 'react';
import {
  Wifi, Bath, ShowerHead, Droplets, Shirt, Plug, DoorOpen, Bug, Fan, DoorClosed, VolumeX, Sunrise, Trees,
  Armchair, UtensilsCrossed, Flame, LampDesk, Sofa, BedDouble, LayoutGrid, Ruler, Users, Check,
  AirVent, CookingPot, Refrigerator, Coffee, Link2, Home, Trash2, Toilet, SprayCan,
} from 'lucide-react';

// First matching rule wins, so more specific patterns come before general ones.
const RULES = [
  [/wifi/i, Wifi],
  [/air conditioning/i, AirVent],
  [/refrigerator/i, Refrigerator],
  [/kettle/i, Coffee],
  [/kitchen|stovetop/i, CookingPot],
  [/interconnected/i, Link2],
  [/ground floor unit/i, Home],
  [/bidet/i, ShowerHead],
  [/ensuite|bathroom|bath|shower/i, Bath],
  [/toiletries|shampoo|soap/i, Droplets],
  [/toilet/i, Toilet],
  [/towels|linen/i, Shirt],
  [/socket|adapter/i, Plug],
  [/entrance/i, DoorOpen],
  [/soundproof/i, VolumeX],
  [/mosquito/i, Bug],
  [/^fan$/i, Fan],
  [/wardrobe|closet/i, DoorClosed],
  [/rack/i, Shirt],
  [/trash/i, Trash2],
  [/cleaning/i, SprayCan],
  [/balcony/i, Sunrise],
  [/garden/i, Trees],
  [/dining/i, UtensilsCrossed],
  [/patio|outdoor furniture/i, Armchair],
  [/barbecue|bbq/i, Flame],
  [/desk/i, LampDesk],
  [/seating|sofa/i, Sofa],
  [/bed|pillow/i, BedDouble],
  [/floor/i, LayoutGrid],
  [/m²|space/i, Ruler],
  [/sleeps/i, Users],
];

const iconForAmenity = (label) => RULES.find(([pattern]) => pattern.test(label))?.[1] ?? Check;

export default function AmenityIcon({ label, className = 'w-4 h-4' }) {
  const Icon = iconForAmenity(label);
  return <Icon className={className} aria-hidden="true" />;
}
