// Flat room-only (RO) rates (LKR per room per night).
// Bed & Breakfast = RO + LKR 1,500 per adult per night.
// A single price applies year-round — no seasonal tiers.

export const BREAKFAST_PER_ADULT = 1500;

// Parses 'YYYY-MM-DD' as a local date (new Date('YYYY-MM-DD') would be UTC).
export const parseLocalDate = (iso) => {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d);
};

export const breakfastSupplement = (adults) => BREAKFAST_PER_ADULT * adults;

// Always returns the room's flat nightly rate (kept as an object for API compatibility).
export const displayRate = (room) => ({
  amount: room.priceRO,
  isCurrentMonth: false,
  month: null,
});

// Room-only rate for any date — always the flat price.
export const roomOnlyRate = (room) => room.priceRO;

// Total for a stay (nights × flat nightly rate + optional breakfast).
export const stayTotal = (room, checkIn, checkOut, includeBreakfast, adults) => {
  let total = 0;
  let nights = 0;
  const night = parseLocalDate(checkIn);
  const end = parseLocalDate(checkOut);
  while (night < end) {
    nights += 1;
    total += room.priceRO + (includeBreakfast ? breakfastSupplement(adults) : 0);
    night.setDate(night.getDate() + 1);
  }
  return { total, nights, unpricedNights: 0 };
};
