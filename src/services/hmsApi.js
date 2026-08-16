/**
 * HMS (Hotel Management System) API Integration Client for Paradise Bungalow
 * Connects directly to the live serverless API and public booking engine.
 */

export const HMS_CONFIG = {
  HOTEL_ID: 1,
  API_BASE_URL: 'https://api.hms.paradisecrew.site/api/public',
  BOOKING_ENGINE_URL: 'https://hms.paradisecrew.site/book/1',
  REVIEW_ENGINE_URL: 'https://hms.paradisecrew.site/review/1',
};

/**
 * Fetch approved guest reviews for Paradise Bungalow from HMS
 */
export async function fetchLiveReviews() {
  try {
    const res = await fetch(`${HMS_CONFIG.API_BASE_URL}/hotels/${HMS_CONFIG.HOTEL_ID}/reviews`);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.warn('HMS live reviews fetch fallback:', err);
    return null;
  }
}

/**
 * Query real-time room availability and pricing from HMS
 */
export async function checkRoomAvailability({ checkInDate, checkOutDate, adults = 2, children = 0 }) {
  try {
    const params = new URLSearchParams({
      hotelId: String(HMS_CONFIG.HOTEL_ID),
      checkInDate,
      checkOutDate,
      adults: String(adults),
      children: String(children),
    });

    const res = await fetch(`${HMS_CONFIG.API_BASE_URL}/rooms/available?${params.toString()}`);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error('HMS availability check error:', err);
    throw err;
  }
}

/**
 * Submit a direct booking reservation to HMS
 */
export async function createDirectBooking(bookingData) {
  try {
    const payload = {
      hotelId: HMS_CONFIG.HOTEL_ID,
      roomTypeId: bookingData.roomTypeId,
      checkInDate: bookingData.checkInDate,
      checkOutDate: bookingData.checkOutDate,
      adults: bookingData.adults,
      children: bookingData.children || 0,
      firstName: bookingData.firstName,
      lastName: bookingData.lastName,
      email: bookingData.email,
      phone: bookingData.phone,
      specialRequests: bookingData.specialRequests || '',
    };

    const res = await fetch(`${HMS_CONFIG.API_BASE_URL}/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || 'Failed to submit booking reservation');
    }

    return data;
  } catch (err) {
    console.error('HMS create direct booking error:', err);
    throw err;
  }
}
