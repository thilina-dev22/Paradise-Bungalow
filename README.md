# Paradise Bungalow

Marketing and booking-inquiry website for Paradise Bungalow, Midigama, Sri Lanka. React 19 + Vite + Tailwind CSS 4.

## Commands

```bash
npm install
npm run dev      # local dev server (http://localhost:5173)
npm run build    # production build into dist/
npm run lint     # oxlint
```

## Environment

`VITE_WEB3FORMS_ACCESS_KEY` (in `.env`) is the Web3Forms access key used by the contact form. Booking inquiries do not use it: they open WhatsApp or the guest's email app.

## Where things live

| What | Where |
|---|---|
| Rooms (names, beds, sizes, amenities, highlights, Airbnb links, seasonal rates) | `src/data/roomsData.js` |
| Rate logic (seasons, breakfast supplement, stay totals) | `src/data/pricing.js` |
| Photo gallery list | `src/data/galleryData.js` (photos in `public/images/<folder>/`) |
| Live currency conversion (LKR / USD / EUR) | `src/context/CurrencyContext.jsx`, `src/context/currency.js` |
| Amenity icons | `src/components/AmenityIcon.jsx` |
| SEO meta tags and structured data | `index.html`, `public/sitemap.xml` |

## Updating rates

Rates are stored as room-only LKR per night in each room's `ratesRO` (September to April, from the tariff sheet). May to August are filled in automatically at the room's lowest rate by `yearRates()`. Bed and breakfast is room-only plus `BREAKFAST_PER_ADULT` (LKR 1,500) per adult per night. Update both `roomsData.js` and, if the tariff changes, `index.html` (structured data).

## Currency

Prices are authored in LKR. USD and EUR are converted using live rates from `open.er-api.com` (cached for 1 hour in the browser). If rates cannot be loaded the site falls back to LKR rather than showing a wrong number.

## Booking inquiries

The booking popup builds an inquiry message (room, dates, guests, breakfast, estimated total in LKR) and sends it through WhatsApp (`wa.me`) or an email draft (`mailto:`). Nothing is stored or confirmed automatically; the team confirms availability by reply.
