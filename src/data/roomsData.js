import { ALL_GALLERY_ITEMS } from './galleryData';

const photosOf = (category) =>
  ALL_GALLERY_ITEMS.filter((item) => item.category === category).map((item) => item.src);

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

const COMMON_AMENITIES = [
  'Ensuite bathroom', 'Free WiFi', 'Free toiletries', 'Towels & Linen', 'Socket near bed',
  'Private entrance', 'Mosquito net', 'Fan', 'Wardrobe / closet', 'Soundproofing',
];

export const ROOMS_DATA = [
  {
    id: 'wooden-cabana',
    category: 'wooden-cabana',
    title: 'Wooden Cabana',
    badge: 'Eco Wooden Stay',
    subtitle: 'Charming rustic cabana nestled in lush tropical gardens',
    size: '27 m²',
    maxGuests: 2,
    bedConfig: '1 Double Bed',
    view: 'Garden View & Private Patio',
    priceOnly: 21,
    priceBreakfast: 26,
    originalPriceOnly: 24,
    originalPriceBreakfast: 30,
    highlights: [
      '27 m² Private Space',
      'Ground Floor Garden View',
      'Private Patio & Barbecue',
      'Soundproofed & Mosquito Net',
      'Free High-Speed WiFi',
      'Ensuite Bathroom & Bidet',
    ],
    amenities: [...COMMON_AMENITIES, 'Garden view', 'Patio', 'Barbecue', 'Bidet', 'Desk', 'Seating area', 'Outdoor furniture', 'Outdoor dining area'],
    images: photosOf('wooden-cabana'),
    description: 'Experience authentic Sri Lankan tropical living in our handcrafted Wooden Cabana. Featuring direct access to flower-filled gardens, private patio dining, and eco-friendly wooden craftsmanship designed for peaceful relaxation.',
  },
  {
    id: 'king-room-1',
    category: 'king-room-1',
    title: 'King Room 1',
    badge: 'King Bed',
    subtitle: 'Spacious, comfortable room with a plush king-size bed',
    size: '32 m²',
    maxGuests: 2,
    bedConfig: '1 King Bed',
    view: 'Garden View',
    priceOnly: 25,
    priceBreakfast: 30,
    originalPriceOnly: 28,
    originalPriceBreakfast: 34,
    highlights: [
      'King-Size Bed',
      'Soundproofed Sanctuary',
      'Ensuite Bathroom',
      'Mosquito Net & Fan',
      'Free High-Speed WiFi',
      'Private Entrance',
    ],
    amenities: [...COMMON_AMENITIES, 'Extra long beds (> 2m)', 'Tile/marble floor', 'Desk', 'Seating area'],
    images: photosOf('king-room-1'),
    description: 'A restful king-bed room at Paradise Bungalow with quiet surroundings, a clean ensuite bathroom, and easy access to the gardens, just 50 meters from Midigama beach.',
  },
  {
    id: 'king-room-2',
    category: 'king-room-2',
    title: 'King Room 2',
    badge: 'King Bed',
    subtitle: 'Bright and airy room with a plush king-size bed',
    size: '32 m²',
    maxGuests: 2,
    bedConfig: '1 King Bed',
    view: 'Garden View',
    priceOnly: 25,
    priceBreakfast: 30,
    originalPriceOnly: 28,
    originalPriceBreakfast: 34,
    highlights: [
      'King-Size Bed',
      'Soundproofed Sanctuary',
      'Ensuite Bathroom',
      'Mosquito Net & Fan',
      'Free High-Speed WiFi',
      'Private Entrance',
    ],
    amenities: [...COMMON_AMENITIES, 'Extra long beds (> 2m)', 'Tile/marble floor', 'Desk', 'Seating area'],
    images: photosOf('king-room-2'),
    description: 'A second king-bed room with the same calm atmosphere and comfort, ideal for couples or friends travelling together who would like neighbouring rooms.',
  },
  {
    id: 'standard-garden-view',
    category: 'standard-garden-view',
    title: 'Standard Double Room with Garden View',
    badge: 'Garden View',
    subtitle: 'Simple, cosy double room overlooking the tropical garden',
    size: '30 m²',
    maxGuests: 2,
    bedConfig: '1 Double Bed',
    view: 'Garden View',
    priceOnly: 25,
    priceBreakfast: 30,
    originalPriceOnly: 28,
    originalPriceBreakfast: 34,
    highlights: [
      'Garden View',
      'Double Bed',
      'Ensuite Bathroom',
      'Mosquito Net & Fan',
      'Free High-Speed WiFi',
      'Private Entrance',
    ],
    amenities: [...COMMON_AMENITIES, 'Garden view', 'Tile/marble floor', 'Desk', 'Seating area'],
    images: photosOf('standard-garden-view'),
    description: 'A comfortable double room with views of our lush garden. A peaceful base for surfing, exploring the south coast, or simply relaxing.',
  },
  {
    id: 'family-garden-view',
    category: 'family-garden-view',
    title: 'Family Room with Garden View',
    badge: 'Family Friendly',
    subtitle: 'Roomy family setup surrounded by greenery',
    size: '42 m²',
    maxGuests: 3,
    bedConfig: '1 Double Bed + 1 Single Bed',
    view: 'Garden View',
    priceOnly: 32,
    priceBreakfast: 40,
    originalPriceOnly: 36,
    originalPriceBreakfast: 45,
    highlights: [
      'Sleeps up to 3 Guests',
      'Garden View',
      'Ensuite Bathroom',
      'Mosquito Net & Fan',
      'Free High-Speed WiFi',
      'Private Entrance',
    ],
    amenities: [...COMMON_AMENITIES, 'Garden view', 'Patio', 'Tile/marble floor', 'Seating area', 'Desk'],
    images: photosOf('family-garden-view'),
    description: 'Plenty of space for couples with a child or a small family, with garden views and everything needed for a relaxed stay.',
  },
  {
    id: 'superior-family-balcony',
    category: 'superior-family-balcony',
    title: 'Superior Family Room with Balcony',
    badge: 'Private Balcony',
    subtitle: 'Generous family room with its own balcony',
    size: '45 m²',
    maxGuests: 4,
    bedConfig: '2 Double Beds',
    view: 'Balcony & Garden View',
    priceOnly: 38,
    priceBreakfast: 46,
    originalPriceOnly: 42,
    originalPriceBreakfast: 51,
    highlights: [
      'Sleeps up to 4 Guests',
      'Private Balcony',
      'Ensuite Bathroom',
      'Mosquito Net & Fan',
      'Free High-Speed WiFi',
      'Private Entrance',
    ],
    amenities: [...COMMON_AMENITIES, 'Private Balcony', 'Garden view', 'Tile/marble floor', 'Seating area', 'Desk'],
    images: photosOf('superior-family-balcony'),
    description: 'Our largest family option, with room for four guests and a private balcony to enjoy the morning air and tropical views.',
  },
  {
    id: 'standard-balcony',
    category: 'standard-balcony',
    title: 'Standard Double Room with Balcony',
    badge: 'Private Balcony',
    subtitle: 'Breezy double room with a private balcony',
    size: '32 m²',
    maxGuests: 2,
    bedConfig: '1 Double Bed',
    view: 'Balcony & Garden View',
    priceOnly: 25,
    priceBreakfast: 30,
    originalPriceOnly: 28,
    originalPriceBreakfast: 34,
    highlights: [
      'Private Balcony',
      'Double Bed',
      'Ensuite Bathroom',
      'Mosquito Net & Fan',
      'Free High-Speed WiFi',
      'Private Entrance',
    ],
    amenities: [...COMMON_AMENITIES, 'Private Balcony', 'Garden view', 'Tile/marble floor', 'Desk', 'Seating area'],
    images: photosOf('standard-balcony'),
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
  web3formsAccessKey: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || 'cf00ac11-7636-4c7c-b18a-d50a2c6a477e',
  totalRooms: 7,
  rating: 9.6,
  reviewCount: 148,
  highlights: [
    '7 Rooms in Total (Boutique)',
    'Free High-Speed WiFi',
    'Exceptional Breakfast Included Option',
    'Direct Booking Best Rate Guarantee (0% Commission)',
    'Free Cancellation & No Credit Card Needed Options',
    '12% Genius Discount Compatible'
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
  checkIn: '12:00 to 21:00',
  checkOut: '00:00 to 11:00',
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
    a: 'Check-in is from 12:00 to 21:00, and check-out is until 11:00. Express check-in/check-out and luggage storage are also available.'
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
