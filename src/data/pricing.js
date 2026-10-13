// Seasonal rates (LKR per room per night) from the official Paradise Bungalow tariff sheet.
// Only room-only (RO) rates are stored: Bed & Breakfast = RO + LKR 1,500 per adult per night.
// The tariff sheet covers September to April; May to August use the lowest (regular season) rate of each room.

export const BREAKFAST_PER_ADULT = 1500;

export const RATE_MONTHS = [
  { key: 'jan', label: 'January', short: 'Jan', index: 0, season: 'peak' },
  { key: 'feb', label: 'February', short: 'Feb', index: 1, season: 'mid' },
  { key: 'mar', label: 'March', short: 'Mar', index: 2, season: 'standard' },
  { key: 'apr', label: 'April', short: 'Apr', index: 3, season: 'standard' },
  { key: 'may', label: 'May', short: 'May', index: 4, season: 'standard' },
  { key: 'jun', label: 'June', short: 'Jun', index: 5, season: 'standard' },
  { key: 'jul', label: 'July', short: 'Jul', index: 6, season: 'standard' },
  { key: 'aug', label: 'August', short: 'Aug', index: 7, season: 'standard' },
  { key: 'sep', label: 'September', short: 'Sep', index: 8, season: 'standard' },
  { key: 'oct', label: 'October', short: 'Oct', index: 9, season: 'standard' },
  { key: 'nov', label: 'November', short: 'Nov', index: 10, season: 'mid' },
  { key: 'dec', label: 'December', short: 'Dec', index: 11, season: 'peak' },
];

// Adds May to August, which are priced at the room's lowest published rate.
export const yearRates = (rates) => {
  const lowest = Math.min(...Object.values(rates));
  return { ...rates, may: lowest, jun: lowest, jul: lowest, aug: lowest };
};

export const SEASON_LABELS = { standard: 'Regular Season', mid: 'Mid Season', peak: 'Peak Season' };

// Parses 'YYYY-MM-DD' as a local date (new Date('YYYY-MM-DD') would be UTC).
export const parseLocalDate = (iso) => {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d);
};

const monthOf = (date) => RATE_MONTHS.find((m) => m.index === date.getMonth());

export const breakfastSupplement = (adults) => BREAKFAST_PER_ADULT * adults;

// Room-only rate for the month a date falls in, or null when no rate is published.
export const roomOnlyRate = (room, date) => {
  const month = monthOf(date);
  return month ? room.ratesRO[month.key] : null;
};

// Rate for the current month, falling back to the lowest published rate.
export const displayRate = (room, date = new Date()) => {
  const current = roomOnlyRate(room, date);
  if (current != null) return { amount: current, isCurrentMonth: true, month: monthOf(date) };
  return { amount: Math.min(...Object.values(room.ratesRO)), isCurrentMonth: false, month: null };
};

// Total for a stay, night by night. `unpricedNights` counts nights outside the published months.
export const stayTotal = (room, checkIn, checkOut, includeBreakfast, adults) => {
  let total = 0;
  let nights = 0;
  let unpricedNights = 0;
  const night = parseLocalDate(checkIn);
  const end = parseLocalDate(checkOut);
  while (night < end) {
    nights += 1;
    const rate = roomOnlyRate(room, night);
    if (rate == null) unpricedNights += 1;
    else total += rate + (includeBreakfast ? breakfastSupplement(adults) : 0);
    night.setDate(night.getDate() + 1);
  }
  return { total, nights, unpricedNights };
};

// One entry per season (regular, mid, peak) with its months and room-only nightly rate.
export const seasonRates = (room) =>
  ['standard', 'mid', 'peak'].map((season) => {
    const months = RATE_MONTHS.filter((m) => m.season === season);
    return { season, label: SEASON_LABELS[season], months, amount: room.ratesRO[months[0].key] };
  });
