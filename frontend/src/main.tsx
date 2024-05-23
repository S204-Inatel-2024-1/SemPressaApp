import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Router } from './router'

import { Toaster } from 'sonner'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router />
    <Toaster position="top-right" closeButton richColors />
  </React.StrictMode>,
)
