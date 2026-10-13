import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { CurrencyContext, CURRENCIES } from './currency';

// Live exchange rates from open.er-api.com (free, no key, CORS enabled). Prices are authored in LKR.
const RATES_URL = 'https://open.er-api.com/v6/latest/LKR';
const CACHE_KEY = 'pb_fx_rates';
const CHOICE_KEY = 'pb_currency';
const CACHE_TTL_MS = 60 * 60 * 1000;
const REFRESH_MS = 60 * 60 * 1000;

const readStorage = (key) => {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
};

const writeStorage = (key, value) => {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Storage can be blocked (private mode); the switcher still works for this visit.
  }
};

const readCache = () => {
  try {
    const cached = JSON.parse(readStorage(CACHE_KEY));
    if (cached?.rates?.USD && cached?.rates?.EUR) return cached;
  } catch {
    // ignore corrupt cache
  }
  return null;
};

export function CurrencyProvider({ children }) {
  const [currency, setCurrencyState] = useState(() => {
    const saved = readStorage(CHOICE_KEY);
    return CURRENCIES.includes(saved) ? saved : 'LKR';
  });
  const [fx, setFx] = useState(() => readCache()); // { rates: {USD, EUR}, fetchedAt }
  const [status, setStatus] = useState(() => (readCache() ? 'cached' : 'loading'));

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      const cached = readCache();
      if (cached && Date.now() - cached.fetchedAt < CACHE_TTL_MS) {
        setFx(cached);
        setStatus('live');
        return;
      }
      try {
        const res = await fetch(RATES_URL);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (data.result !== 'success' || !data.rates?.USD || !data.rates?.EUR) throw new Error('Bad payload');
        const next = {
          rates: { USD: data.rates.USD, EUR: data.rates.EUR },
          fetchedAt: Date.now(),
          providerUpdated: data.time_last_update_utc,
        };
        writeStorage(CACHE_KEY, JSON.stringify(next));
        if (!cancelled) {
          setFx(next);
          setStatus('live');
        }
      } catch (err) {
        console.warn('Live exchange rates unavailable:', err);
        if (!cancelled) setStatus(cached ? 'cached' : 'unavailable');
      }
    };

    load();
    const timer = setInterval(load, REFRESH_MS);
    return () => {
      cancelled = true;
      clearInterval(timer);
    };
  }, []);

  const setCurrency = useCallback((next) => {
    if (!CURRENCIES.includes(next)) return;
    setCurrencyState(next);
    writeStorage(CHOICE_KEY, next);
  }, []);

  const value = useMemo(() => {
    const canConvert = Boolean(fx?.rates);
    // Without any rate (never fetched, offline), fall back to LKR rather than show a wrong number.
    const active = currency !== 'LKR' && canConvert ? currency : 'LKR';

    const format = (lkr) => {
      if (active === 'LKR') return `LKR ${Math.round(lkr).toLocaleString('en-US')}`;
      const converted = lkr * fx.rates[active];
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: active,
        // Small amounts (a breakfast supplement is about $5) keep their cents; larger totals are rounded.
        minimumFractionDigits: 0,
        maximumFractionDigits: converted < 100 ? 2 : 0,
      }).format(converted);
    };

    return { currency: active, requested: currency, setCurrency, format, canConvert, status, fx };
  }, [currency, fx, status, setCurrency]);

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}

