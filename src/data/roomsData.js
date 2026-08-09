export const ROOM_CATEGORIES = [
  { id: 'all', name: 'All Accommodations' },
  { id: 'cabana', name: 'Wooden Cabanas' },
  { id: 'standard', name: 'Standard Double Rooms' },
  { id: 'family-bungalow', name: 'Bungalow Family Rooms (3 Guests)' },
  { id: 'family-4p', name: 'Family Rooms (4 Guests)' },
  { id: 'superior-kitchen', name: 'Superior Room with Kitchen' },
];

export const ROOMS_DATA = [
  {
    id: 'wooden-cabana',
    category: 'cabana',
    title: 'Wooden Cabana',
    count: 2,
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
      'Ensuite Bathroom & Bidet'
    ],
    amenities: [
      'Garden view', 'Patio', 'Ensuite bathroom', 'Soundproofing', 'Barbecue', 'Free WiFi',
      'Free toiletries', 'Bidet', 'Toilet', 'Bath or shower', 'Towels & Linen', 'Socket near bed',
      'Cleaning products', 'Desk', 'Seating area', 'Private entrance', 'Mosquito net', 'Fan',
      'Extra long beds (> 2m)', 'Outdoor furniture', 'Outdoor dining area', 'Wardrobe / closet',
      'Dining table', 'Ground floor unit', 'Clothes rack', 'Drying rack for clothing'
    ],
    images: [
      '/images/IMG_8553.jpg',
      '/images/IMG_8565.jpg',
      '/images/IMG_8576.jpg',
      '/images/IMG_8577.jpg'
    ],
    description: 'Experience authentic Sri Lankan tropical living in our handcrafted Wooden Cabanas. Featuring direct access to flower-filled gardens, private patio dining, and eco-friendly wooden craftsmanship designed for peaceful relaxation.'
  },
  {
    id: 'standard-double-upper',
    category: 'standard',
    title: 'Deluxe Double Room with Balcony',
    count: 2,
    locationNote: 'Located on 1st Floor & 2nd Floor (2 Rooms)',
    badge: 'Upper Floor Balcony',
    subtitle: 'Elevated luxury with breezy private balcony & garden vistas',
    size: '32 m²',
    maxGuests: 2,
    bedConfig: '1 Extra-Large Double Bed',
    view: 'High Floor Garden View & Balcony',
    priceOnly: 25,
    priceBreakfast: 30,
    originalPriceOnly: 28,
    originalPriceBreakfast: 34,
    highlights: [
      '32 m² Spacious Room',
      'Private Balcony & High Floor View',
      'Extra-Large King Bed',
      'Soundproofed Sanctuary',
      'Tile & Marble Flooring',
      'Ensuite Bathroom with Bidet'
    ],
    amenities: [
      'Private Balcony', 'Garden view', 'Patio', 'Ensuite bathroom', 'Soundproofing', 'Barbecue',
      'Free WiFi', 'Free toiletries', 'Bidet', 'Toilet', 'Bath or shower', 'Towels & Linen',
      'Socket near bed', 'Tile/marble floor', 'Desk', 'Seating area', 'Private entrance',
      'Mosquito net', 'Fan', 'Extra long beds (> 2m)', 'Outdoor furniture', 'Outdoor dining area',
      'Wardrobe / closet', 'Dining table', 'Clothes rack', 'Drying rack'
    ],
    images: [
      '/images/IMG_8580.jpg',
      '/images/IMG_8588.jpg',
      '/images/IMG_8592.jpg',
      '/images/IMG_8596.jpg'
    ],
    description: 'Positioned on the upper levels of Paradise Bungalow, these Deluxe Double Rooms feature airy private balconies with panoramic tropical garden views, high ceilings, polished marble floors, and tranquil surroundings.'
  },
  {
    id: 'standard-double-ground',
    category: 'standard',
    title: 'Standard Double Room with Garden View & AC',
    count: 1,
    locationNote: 'Located on Ground Floor (1 Room)',
    badge: 'Ground Floor & AC',
    subtitle: 'Direct garden access with refreshing air conditioning',
    size: '32 m²',
    maxGuests: 2,
    bedConfig: '1 Extra-Large Double Bed',
    view: 'Ground Floor Garden View & Patio',
    priceOnly: 25,
    priceBreakfast: 30,
    originalPriceOnly: 28,
    originalPriceBreakfast: 34,
    highlights: [
      '32 m² Ground Floor Access',
      'Air Conditioning',
      'Interconnected Room Option',
      'Extra-Large King Bed',
      'Private Patio Dining',
      'Ensuite Bathroom'
    ],
    amenities: [
      'Air conditioning', 'Garden view', 'Patio', 'Ensuite bathroom', 'Soundproofing', 'Barbecue',
      'Free WiFi', 'Interconnected rooms available', 'Free toiletries', 'Bidet', 'Toilet',
      'Bath or shower', 'Towels & Linen', 'Socket near bed', 'Tile/marble floor', 'Desk',
      'Seating area', 'Private entrance', 'Mosquito net', 'Fan', 'Outdoor furniture',
      'Outdoor dining area', 'Wardrobe', 'Dining table', 'Ground floor convenience'
    ],
    images: [
      '/images/IMG_8592.jpg',
      '/images/IMG_8580.jpg',
      '/images/IMG_8596.jpg'
    ],
    description: 'Conveniently situated on the ground floor for easy access, this AC room connects directly to the garden patio. Perfect for guests who prefer seamless indoor-outdoor relaxation without climbing stairs.'
  },
  {
    id: 'bungalow-family-3p',
    category: 'family-bungalow',
    title: 'Bungalow Type Family Room',
    count: 2,
    badge: '3 Guests Max',
    subtitle: 'Cozy bungalow setup crafted for couples or small families',
    size: '42 m²',
    maxGuests: 3,
    bedConfig: '1 Single Bed + 1 Extra-Large Double Bed',
    view: 'Garden View & Spacious Patio',
    priceOnly: 32,
    priceBreakfast: 40,
    originalPriceOnly: 36,
    originalPriceBreakfast: 45,
    highlights: [
      '42 m² Generous Bungalow Space',
      'Air Conditioning',
      '1 Single + 1 Extra-Large Double Bed',
      'Max 3 Guests',
      'Ground Floor Garden Patio',
      'Dining Area & Desk'
    ],
    amenities: [
      'Air conditioning', 'Garden view', 'Patio', 'Ensuite bathroom', 'Soundproofing', 'Barbecue',
      'Free WiFi', 'Free toiletries', 'Bidet', 'Toilet', 'Bath or shower', 'Towels & Linen',
      'Socket near bed', 'Tile/marble floor', 'Desk', 'Seating area', 'Private entrance',
      'Mosquito net', 'Fan', 'Extra long beds', 'Outdoor furniture', 'Dining table & area',
      'Ground floor unit', 'Clothes rack', 'Drying rack'
    ],
    images: [
      '/images/IMG_8603.jpg',
      '/images/IMG_8621.jpg',
      '/images/IMG_8629.jpg'
    ],
    description: 'Our Bungalow Type Family Rooms provide 42 m² of peaceful space, featuring both an extra-large double bed and a single bed. Equipped with air conditioning and garden patio seating ideal for family morning tea.'
  },
  {
    id: 'family-room-4p',
    category: 'family-4p',
    title: 'Spacious Family Room (4 Guests)',
    count: 2,
    badge: '4 Guests Max',
    subtitle: 'Expansive family suite with flexible sleeping arrangements',
    size: '50 m²',
    maxGuests: 4,
    bedConfig: 'Flexible Bedding (Double Beds + Single Beds)',
    view: 'Tropical Garden Vistas',
    priceOnly: 38,
    priceBreakfast: 46,
    originalPriceOnly: 42,
    originalPriceBreakfast: 52,
    highlights: [
      '50 m² Large Family Suite',
      'Accommodates up to 4 Guests',
      'Air Conditioning',
      'Private Seating & Dining Area',
      'Soundproofed Quiet Atmosphere',
      'Ensuite Bathroom'
    ],
    amenities: [
      'Air conditioning', 'Garden view', 'Patio', 'Ensuite bathroom', 'Soundproofing', 'Barbecue',
      'Free WiFi', 'Free toiletries', 'Bidet', 'Toilet', 'Bath or shower', 'Towels & Linen',
      'Seating area', 'Private entrance', 'Mosquito net', 'Fan', 'Outdoor furniture',
      'Dining table', 'Wardrobe', 'Family-friendly setup'
    ],
    images: [
      '/images/IMG_8635.jpg',
      '/images/IMG_8668.jpg',
      '/images/IMG_8670.jpg'
    ],
    description: 'Designed specifically for larger families or group travelers, these 4-guest Family Rooms offer generous living area, air conditioning, multiple sleeping options, and immediate access to garden amenities.'
  },
  {
    id: 'superior-double-kitchen',
    category: 'superior-kitchen',
    title: 'Superior Double Room with Private Kitchen',
    count: 1,
    badge: '65 m² Suite with Kitchen',
    subtitle: 'Our largest luxury suite featuring a private fully-equipped kitchen & balcony',
    size: '65 m²',
    maxGuests: 2,
    bedConfig: '1 Extra-Large Double Bed + Sofa Bed',
    view: 'High Floor Panoramic Garden & Mountain View',
    priceOnly: 36,
    priceBreakfast: 41,
    originalPriceOnly: 41,
    originalPriceBreakfast: 47,
    highlights: [
      '65 m² Luxury Suite',
      'Private Kitchen & Kitchenette (Stovetop, Fridge, Kettle)',
      'High Floor Private Balcony',
      'Air Conditioning & Living Room Sofa',
      'Kitchenware & Cookware Provided',
      'Ensuite Bathroom with Bidet & Toiletries'
    ],
    amenities: [
      'Private kitchen', 'Kitchenette', 'Stovetop', 'Refrigerator', 'Electric kettle', 'Kitchenware',
      'High floor', 'Private Balcony', 'Air conditioning', 'Ensuite bathroom', 'Garden view', 'Patio',
      'Soundproofing', 'Barbecue', 'Free WiFi', 'Sofa & Sofa bed', 'Free toiletries', 'Bidet',
      'Toilet', 'Bath or shower', 'Towels & Linen', 'Socket near bed', 'Tile/marble floor',
      'Desk', 'Seating area', 'Private entrance', 'Mosquito net', 'Fan', 'Extra long beds',
      'Outdoor furniture', 'Outdoor dining area', 'Wardrobe', 'Dining table'
    ],
    images: [
      '/images/IMG_8698.jpg',
      '/images/IMG_8713.jpg',
      '/images/IMG_8716.jpg',
      '/images/IMG_8720.jpg',
      '/images/IMG_8728.jpg',
      '/images/IMG_8729.jpg'
    ],
    description: 'The pinnacle of Paradise Bungalow! A massive 65 m² apartment suite featuring a full private kitchen (stovetop, fridge, kettle, utensils), plush sofa living area, high-floor balcony with sweeping views, and king-size luxury bed.'
  }
];

export const PROPERTY_DETAILS = {
  name: 'Paradise Bungalow',
  tagline: 'Your Peaceful Tropical Oasis in Paradise',
  phone: '+94 76 282 5336',
  phoneClean: '94762825336',
  email: 'info@paradisebungalow.com',
  bookingComUrl: 'https://www.booking.com/Share-Cxf3kD',
  googleMapUrl: 'https://maps.app.goo.gl/u9SN9kYg3KNBocra6',
  airbnbUrl: '#',
  totalRooms: 10,
  rating: 9.6,
  reviewCount: 148,
  highlights: [
    '10 Rooms in Total',
    'Free High-Speed WiFi',
    'Exceptional Breakfast Included Option',
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
    comment: 'Super fast WiFi, clean rooms, quiet atmosphere, and very close to nature. Booking was super simple via Booking.com. Highly recommended!',
    date: 'May 2026'
  }
];

export const SURROUNDINGS_DATA = {
  beaches: [
    { name: 'Midigama Beach', distance: '200 m (100 m nearest access point)' },
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
    q: 'How close is Paradise Bungalow to the beach?',
    a: 'The nearest beach is just 100 to 200 meters away (Midigama Beach), famous for world-class surf breaks and relaxing palm shores.'
  },
  {
    q: 'What type of room options are available?',
    a: 'We offer 10 rooms in total across 5 categories: Wooden Cabanas, Deluxe Double Rooms with Balcony, Ground Floor AC Rooms, Bungalow Family Rooms (3 Guests), Family Quad Rooms (4 Guests), and a 65 m² Superior Room with Private Kitchen.'
  },
  {
    q: 'What are the check-in and check-out times?',
    a: 'Check-in is from 12:00 to 21:00, and check-out is until 11:00. Express check-in/check-out and luggage storage are also available.'
  },
  {
    q: 'What activities and services are available on site?',
    a: 'Paradise Bungalow offers bicycle rentals, a children’s playground, kids’ club, barbecue facilities, tour desk assistance, airport shuttles, and daily housekeeping.'
  },
  {
    q: 'How far is the property from Weligama town centre?',
    a: 'Paradise Bungalow is located just 4.5 km from the centre of Weligama.'
  }
];

