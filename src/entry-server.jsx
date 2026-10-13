import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './App.jsx';
import { CurrencyProvider } from './context/CurrencyContext';

// Used at build time (scripts/prerender.mjs) to put the full page into dist/index.html for crawlers.
export function render() {
  return renderToString(
    <CurrencyProvider>
      <App />
    </CurrencyProvider>
  );
}
