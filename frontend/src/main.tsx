import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Router } from './router'

import { ThemeProvider } from './theme/provider'
import { Toaster } from './components/ui/sonner'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="sem-pressa-theme">
      <Router />
      <Toaster position="top-right" closeButton richColors />
    </ThemeProvider>
  </React.StrictMode>,
)
