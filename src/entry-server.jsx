import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import WifiPage from './pages/WifiPage.jsx';
import { CurrencyProvider } from './context/CurrencyContext';

// Used at build time (scripts/prerender.mjs) to put the full page into dist/index.html for crawlers.
// The '/' route is pre-rendered for SEO; '/wifi' is intentionally NOT pre-rendered (noindex).
export function render(url = '/') {
  return renderToString(
    <StaticRouter location={url}>
      <Routes>
        <Route
          path="/"
          element={
            <CurrencyProvider>
              <App />
            </CurrencyProvider>
          }
        />
        <Route path="/wifi" element={<WifiPage />} />
      </Routes>
    </StaticRouter>
  );
}
