import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Buffer } from 'buffer'
import './index.css'
import App from './App.tsx'

// 为浏览器环境提供 Buffer polyfill
window.Buffer = Buffer

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* Keep router base in sync with Vite `base` (import.meta.env.BASE_URL) */}
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <App />
    </BrowserRouter>
  </StrictMode>
)
