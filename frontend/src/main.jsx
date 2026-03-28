import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import './locales/i18n'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-primary-600 font-bold">Loading...</div>}>
      <App />
    </Suspense>
  </StrictMode>,
)
