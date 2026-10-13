import React from 'react';
import { CURRENCIES, useCurrency } from '../context/currency';

export default function CurrencySwitcher({ className = '', tone = 'dark' }) {
  const { requested, currency, setCurrency, canConvert, status, fx } = useCurrency();

  const note =
    status === 'live'
      ? `Live exchange rates${fx?.providerUpdated ? ` (updated ${new Date(fx.providerUpdated).toLocaleString()})` : ''}`
      : status === 'cached'
        ? 'Showing last saved exchange rates (live rates unavailable)'
        : status === 'loading'
          ? 'Loading live exchange rates…'
          : 'Live exchange rates unavailable, prices shown in LKR';

  return (
    <div
      role="group"
      aria-label="Currency"
      title={note}
      className={`inline-flex items-center rounded-full border p-0.5 ${
        tone === 'light' ? 'border-stone-300 bg-white' : 'border-white/20 bg-white/10 backdrop-blur-sm'
      } ${className}`}
    >
      {CURRENCIES.map((code) => {
        const disabled = code !== 'LKR' && !canConvert;
        const active = code === currency && code === requested;
        return (
          <button
            key={code}
            type="button"
            disabled={disabled}
            aria-pressed={active}
            onClick={() => setCurrency(code)}
            className={`min-w-[2.75rem] rounded-full px-3 py-2 text-[11px] font-bold tracking-wide transition-colors ${
              active
                ? 'bg-amber-400 text-emerald-950 shadow'
                : `${tone === 'light' ? 'text-emerald-900 hover:bg-stone-100' : 'text-white/80 hover:text-white'} disabled:cursor-not-allowed disabled:opacity-40`
            }`}
          >
            {code}
          </button>
        );
      })}
    </div>
  );
}
