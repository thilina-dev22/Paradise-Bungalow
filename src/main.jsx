import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import WifiPage from './pages/WifiPage.jsx'
import { CurrencyProvider } from './context/CurrencyContext'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
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
    </BrowserRouter>
  </StrictMode>,
)
