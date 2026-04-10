import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import ErrorBoundary from './components/ErrorBoundary'
import { ThemeProvider } from './lib/ThemeContext'
import App from './App'
import './index.css'
import './styles/design-system.css'
import { MagneticCursor } from './components/MagneticCursor'
import { SmoothScroll } from './components/SmoothScroll'
import { Preloader } from './components/Preloader'

const rootEl = document.getElementById('root') ?? (() => {
  const el = document.createElement('div')
  el.id = 'root'
  document.body.appendChild(el)
  return el
})()

ReactDOM.createRoot(rootEl).render(
  <React.StrictMode>
    <ErrorBoundary>
      <ThemeProvider>
        <HelmetProvider>
          <BrowserRouter>
            <Preloader />
            <MagneticCursor />
            <SmoothScroll>
              <App />
            </SmoothScroll>
          </BrowserRouter>
        </HelmetProvider>
      </ThemeProvider>
    </ErrorBoundary>
  </React.StrictMode>,
)
