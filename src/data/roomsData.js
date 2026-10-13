import { ALL_GALLERY_ITEMS } from './galleryData';
import { yearRates } from './pricing';

// Room photos in gallery order; `cover` (file name) is moved to the front as the card's main photo.
const photosOf = (category, cover) => {
  const photos = ALL_GALLERY_ITEMS.filter((item) => item.category === category);
  const coverIndex = photos.findIndex((item) => item.filename === cover);
  if (coverIndex > 0) photos.unshift(...photos.splice(coverIndex, 1));
  return photos.map((item) => item.src);
};

export const ROOM_CATEGORIES = [
  { id: 'all', name: 'All Rooms' },
  { id: 'wooden-cabana', name: 'Wooden Cabana' },
  { id: 'king-room-1', name: 'King Room 1' },
  { id: 'king-room-2', name: 'King Room 2' },
  { id: 'standard-garden-view', name: 'Standard Double · Garden View' },
  { id: 'family-garden-view', name: 'Family Room · Garden View' },
  { id: 'superior-family-balcony', name: 'Superior Family · Balcony' },
  { id: 'standard-balcony', name: 'Standard Double · Balcony' },
];

// Amenities ticked for ALL rooms in the Booking.com Room Facilities page.
const COMMON_AMENITIES = [
  'Private bathroom', 'Bidet', 'Toilet', 'Bath or shower', 'Free toiletries', 'Shampoo', 'Body soap',
  'Toilet paper', 'Towels & linen', 'Wardrobe / closet', 'Clothes rack', 'Drying rack for clothing',
  'Extra long beds (> 2m)', 'Non-feather pillow', 'Fan', 'Soundproofing', 'Private entrance',
  'Seating area', 'Desk', 'Socket near bed', 'Adapter', 'Cleaning products', 'Trash cans',
  'Dining area', 'Dining table', 'Garden view', 'Patio', 'Outdoor furniture', 'Outdoor dining area', 'Barbecue',
];

// Kitchen items ticked only for room 5 and room 9.
const KITCHEN_AMENITIES = ['Kitchen', 'Kitchenette', 'Stovetop', 'Refrigerator', 'Electric kettle', 'Kitchenware'];

export const ROOMS_DATA = [
  {
    id: 'wooden-cabana',
    roomNumber: 2,
    airbnbUrl: 'https://www.airbnb.com/h/pbroom2',
    category: 'wooden-cabana',
    title: 'Wooden Cabana',
    badge: 'Eco Wooden Stay',
    subtitle: 'Charming rustic cabana nestled in lush tropical gardens',
    size: '27 m²',
    maxGuests: 2,
    bedConfig: '1 King Bed',
    view: 'Garden View & Private Patio',
    // LKR per night, room only (tariff months; May-Aug are filled in by yearRates)
    ratesRO: yearRates({ sep: 4500, oct: 4500, nov: 6500, dec: 7500, jan: 7500, feb: 6500, mar: 4500, apr: 4500 }),
    highlights: [
      '27 m² Private Space',
      'Ground Floor Garden View',
      'Private Patio & Barbecue',
      'Soundproofed & Mosquito Net',
      'Free High-Speed WiFi',
      'Ensuite Bathroom & Bidet',
    ],
    amenities: ['Hardwood floor', 'Ground floor unit', 'Mosquito net', ...COMMON_AMENITIES],
    images: photosOf('wooden-cabana'),
    description: 'Experience authentic Sri Lankan tropical living in our handcrafted Wooden Cabana. Featuring direct access to flower-filled gardens, private patio dining, and eco-friendly wooden craftsmanship designed for peaceful relaxation.',
  },
  {
    id: 'king-room-1',
    roomNumber: 3,
    airbnbUrl: 'https://www.airbnb.com/h/pbroom3',
    category: 'king-room-1',
    title: 'King Room 1',
    badge: 'King Bed',
    subtitle: 'Spacious, comfortable room with a plush king-size bed',
    size: '42 m²',
    maxGuests: 2,
    bedConfig: '1 King Bed',
    view: 'Garden View',
    // LKR per night, room only (tariff months; May-Aug are filled in by yearRates)
    ratesRO: yearRates({ sep: 6000, oct: 6000, nov: 8000, dec: 10000, jan: 10000, feb: 8000, mar: 6000, apr: 6000 }),
    highlights: [
      '42 m² Spacious Room',
      'King-Size Bed',
      'Air Conditioning',
      'Ground Floor Garden View',
      'Ensuite Bathroom & Bidet',
      'Mosquito Net & Fan',
    ],
    amenities: ['Air conditioning', 'Ground floor unit', 'Mosquito net', 'Tile/marble floor', ...COMMON_AMENITIES],
    images: photosOf('king-room-1'),
    description: 'A restful king-bed room at Paradise Bungalow with quiet surroundings, a clean ensuite bathroom, and easy access to the gardens, just 50 meters from Midigama beach.',
  },
  {
    id: 'king-room-2',
    roomNumber: 4,
    airbnbUrl: 'https://www.airbnb.com/h/pbroom4',
    category: 'king-room-2',
    title: 'King Room 2',
    badge: 'King Bed',
    subtitle: 'Bright and airy room with a plush king-size bed',
    size: '42 m²',
    maxGuests: 2,
    bedConfig: '1 King Bed',
    view: 'Garden View',
    // LKR per night, room only (tariff months; May-Aug are filled in by yearRates)
    ratesRO: yearRates({ sep: 6000, oct: 6000, nov: 8000, dec: 10000, jan: 10000, feb: 8000, mar: 6000, apr: 6000 }),
    highlights: [
      '42 m² Spacious Room',
      'King-Size Bed',
      'Air Conditioning',
      'Ground Floor Garden View',
      'Ensuite Bathroom & Bidet',
      'Mosquito Net & Fan',
    ],
    amenities: ['Air conditioning', 'Ground floor unit', 'Mosquito net', 'Tile/marble floor', ...COMMON_AMENITIES],
    images: photosOf('king-room-2'),
    description: 'A second king-bed room with the same calm atmosphere and comfort, ideal for couples or friends travelling together who would like neighbouring rooms.',
  },
  {
    id: 'standard-garden-view',
    roomNumber: 6,
    airbnbUrl: 'https://www.airbnb.com/h/pbroom6',
    category: 'standard-garden-view',
    title: 'Standard Double Room with Garden View',
    badge: 'Garden View',
    subtitle: 'Simple, cosy double room overlooking the tropical garden',
    size: '32 m²',
    maxGuests: 2,
    bedConfig: '1 King Bed',
    view: 'Garden View',
    // LKR per night, room only (tariff months; May-Aug are filled in by yearRates)
    ratesRO: yearRates({ sep: 5000, oct: 5000, nov: 6000, dec: 7500, jan: 7500, feb: 6000, mar: 5000, apr: 5000 }),
    highlights: [
      '32 m² Room',
      'King Bed',
      'Air Conditioning',
      'Ground Floor Garden View',
      'Interconnected Room Option',
      'Ensuite Bathroom & Bidet',
    ],
    amenities: ['Air conditioning', 'Interconnected rooms available', 'Ground floor unit', 'Mosquito net', 'Tile/marble floor', ...COMMON_AMENITIES],
    images: photosOf('standard-garden-view', '52.jpg'),
    description: 'A comfortable double room with views of our lush garden. A peaceful base for surfing, exploring the south coast, or simply relaxing.',
  },
  {
    id: 'family-garden-view',
    roomNumber: 5,
    airbnbUrl: 'https://www.airbnb.com/h/pbroom5',
    category: 'family-garden-view',
    title: 'Family Room with Garden View',
    badge: 'Family Friendly',
    subtitle: 'Roomy family setup surrounded by greenery',
    size: '65 m²',
    maxGuests: 4,
    bedConfig: '2 King Beds',
    view: 'Garden View',
    // LKR per night, room only (tariff months; May-Aug are filled in by yearRates)
    ratesRO: yearRates({ sep: 9000, oct: 9000, nov: 11000, dec: 13000, jan: 13000, feb: 11000, mar: 9000, apr: 9000 }),
    highlights: [
      '65 m² Family Room',
      'Sleeps up to 4 Guests',
      'Air Conditioning',
      'Private Kitchen & Kettle',
      'Ground Floor Garden View',
      'Interconnected Room Option',
    ],
    amenities: ['Air conditioning', ...KITCHEN_AMENITIES, 'Interconnected rooms available', 'Ground floor unit', 'Mosquito net', 'Tile/marble floor', ...COMMON_AMENITIES],
    images: photosOf('family-garden-view', '53.jpg'),
    description: 'A spacious 65 m² ground-floor family room for up to four guests, with air conditioning, its own kitchen with stovetop, fridge and kettle, and garden views.',
  },
  {
    id: 'superior-family-balcony',
    roomNumber: 9,
    airbnbUrl: 'https://www.airbnb.com/h/pbroom9',
    category: 'superior-family-balcony',
    title: 'Superior Family Room with Balcony',
    badge: 'Private Balcony',
    subtitle: 'Generous family room with its own balcony',
    size: '65 m²',
    maxGuests: 3,
    bedConfig: '1 King Bed + 1 Single Bed',
    view: 'Balcony & Garden View',
    // LKR per night, room only (tariff months; May-Aug are filled in by yearRates)
    ratesRO: yearRates({ sep: 7000, oct: 7000, nov: 9000, dec: 13000, jan: 13000, feb: 9000, mar: 7000, apr: 7000 }),
    highlights: [
      '65 m² Superior Room',
      'Sleeps up to 3 Adults',
      'Private Balcony',
      'Air Conditioning',
      'Private Kitchen & Stovetop',
      'Sofa & Sofa Bed',
    ],
    amenities: ['Air conditioning', 'Private balcony', ...KITCHEN_AMENITIES, 'Sofa', 'Sofa bed', 'Tile/marble floor', ...COMMON_AMENITIES],
    images: photosOf('superior-family-balcony', '22.jpg'),
    description: 'A superior 65 m² room with a king bed, a single bed, a sofa bed, a private balcony and its own kitchen with stovetop, fridge and kettle.',
  },
  {
    id: 'standard-balcony',
    roomNumber: 10,
    airbnbUrl: 'https://www.airbnb.com/h/pbroom10',
    category: 'standard-balcony',
    title: 'Standard Double Room with Balcony',
    badge: 'Private Balcony',
    subtitle: 'Breezy double room with a private balcony',
    size: '32 m²',
    maxGuests: 2,
    bedConfig: '1 King Bed',
    view: 'Balcony & Garden View',
    // LKR per night, room only (tariff months; May-Aug are filled in by yearRates)
    ratesRO: yearRates({ sep: 5000, oct: 5000, nov: 6000, dec: 7500, jan: 7500, feb: 6000, mar: 5000, apr: 5000 }),
    highlights: [
      '32 m² Room',
      'King Bed',
      'Private Balcony',
      'Garden View',
      'Mosquito Net & Fan',
      'Ensuite Bathroom & Bidet',
    ],
    amenities: ['Private balcony', 'Mosquito net', 'Tile/marble floor', ...COMMON_AMENITIES],
    images: photosOf('standard-balcony', '43.jpg'),
    description: 'A bright double room with a private balcony overlooking the gardens, perfect for a quiet morning coffee.',
  },
];

export const PROPERTY_DETAILS = {
  name: 'Paradise Bungalow',
  tagline: 'Your Peaceful Tropical Oasis in Paradise',
  phone: '+94 76 282 5336',
  phoneClean: '94762825336',
  email: 'info@paradisebungalow.lk',
  googleMapUrl: 'https://maps.app.goo.gl/u9SN9kYg3KNBocra6',
  bookingComUrl: 'https://www.booking.com/Share-Cxf3kD',
  web3formsAccessKey: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || 'cf00ac11-7636-4c7c-b18a-d50a2c6a477e',
  totalRooms: 7,
  rating: 9.6,
  reviewCount: 148,
  highlights: [
    '7 Rooms in Total (Boutique)',
    'Free High-Speed WiFi',
    'Exceptional Breakfast Included Option',
    'Direct Booking Best Rate Guarantee (0% Commission)',
    'Free Cancellation & No Credit Card Needed Options'
  ]
};

export const REVIEWS_DATA = [
  {
    name: 'Sarah M.',
    country: 'United Kingdom',
    rating: 10,
    comment: 'Paradise Bungalow is an absolute hidden gem! The wooden cabanas surrounded by lush tropical gardens were peaceful and beautifully clean. The breakfast served every morning was exceptional!',
    date: 'July 2026'
  },
  {
    name: 'Jan & Ellen',
    country: 'Netherlands',
    rating: 9.8,
    comment: 'We stayed in the Superior Room with Kitchen. Having our own kitchenette on the high floor balcony was wonderful. The host was incredibly welcoming and arranged tours for us.',
    date: 'June 2026'
  },
  {
    name: 'Lukas K.',
    country: 'Germany',
    rating: 9.6,
    comment: 'Super fast WiFi, clean rooms, quiet atmosphere, and very close to nature. Booking was super simple through WhatsApp. Highly recommended!',
    date: 'May 2026'
  }
];

export const SURROUNDINGS_DATA = {
  beaches: [
    { name: 'Midigama Beach & Famous Lazy Right Surf Break', distance: '50 m (1 min walk)' },
    { name: 'Ahangama Beach', distance: '1.1 km' },
    { name: 'Abimanagama Beach', distance: '3.2 km' },
    { name: 'Kabalana Beach', distance: '4.2 km' },
    { name: 'Weligama Beach', distance: '4.5 km' }
  ],
  restaurants: [
    { name: 'Surfing Wombats Restaurant', distance: '550 m' },
    { name: 'Serf View Restaurant', distance: '1 km' },
    { name: 'Shirani Home Made Rice & Curry', distance: '2 km' }
  ],
  attractions: [
    { name: 'Kushtarajagala Historical Site', distance: '4.2 km' },
    { name: 'Koggala Lake & Islands', distance: '5 km' },
    { name: 'Kudagalkanda Forest Sanctuary', distance: '14 km' },
    { name: 'Weligama Town Centre', distance: '4.5 km' }
  ],
  transport: [
    { name: 'Midigama Train Station', distance: '500 m' },
    { name: 'Kumbalgama Railway Station', distance: '2.8 km' },
    { name: 'Koggala Airport (Domestic)', distance: '9 km' },
    { name: 'Mattala Rajapaksa Int. Airport', distance: '97 km' }
  ]
};

export const HOUSE_RULES = {
  checkIn: '1:00 PM',
  checkOut: '11:00 AM',
  children: 'Children of all ages are welcome. Children 3 years & above are charged as adults.',
  cots: 'Cots and extra beds are not available.',
  pets: 'Pets are not allowed.',
  paymentMethods: ['Visa', 'Mastercard', 'UnionPay', 'Cash'],
  languages: ['English', 'Hebrew', 'Russian']
};

export const FAQS_DATA = [
  {
    q: 'What kind of breakfast is served at Paradise Bungalow?',
    a: 'Guests staying at Paradise Bungalow enjoy a top-rated breakfast (review score 10/10). Options include Continental, Vegetarian, and traditional Asian/Sri Lankan breakfast served with fresh tropical fruits.'
  },
  {
    q: 'How close is Paradise Bungalow to the beach & surf breaks?',
    a: 'Paradise Bungalow is located just 50 meters away (1 minute walk) from Midigama Beach and the famous Lazy Right surf break!'
  },
  {
    q: 'What type of room options are available?',
    a: 'We offer 7 rooms: Wooden Cabana, King Room 1, King Room 2, Standard Double Room with Garden View, Family Room with Garden View, Superior Family Room with Balcony, and Standard Double Room with Balcony.'
  },
  {
    q: 'How does direct booking work?',
    a: 'Send your booking inquiry through our website by WhatsApp or email. Booking directly gives you the guaranteed lowest rate with 0% extra commissions, instant email confirmation, and flexible payment at the property.'
  },
  {
    q: 'What are the check-in and check-out times?',
    a: 'Check-in is at 1:00 PM and check-out is at 11:00 AM.'
  },
  {
    q: 'What activities and services are available on site?',
    a: 'Paradise Bungalow offers bicycle rentals, a children playground, barbecue facilities, tour desk assistance, airport shuttles, and daily housekeeping.'
  },
  {
    q: 'How far is the property from Weligama town centre?',
    a: 'Paradise Bungalow is located just 4.5 km from the centre of Weligama.'
  }
];
