import React from 'react'
import ReactDOM from 'react-dom/client'
import { LazyMotion, domAnimation } from 'framer-motion'
import App from './App.jsx'
import './index.css'

// LazyMotion + the `m` component load only the DOM animation feature set
// (~half of framer-motion's footprint). domAnimation covers everything this
// site uses: enter/exit animations, variants, whileInView and hover/tap
// gestures. Drag/layout are intentionally excluded (unused).
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LazyMotion features={domAnimation} strict>
      <App />
    </LazyMotion>
  </React.StrictMode>,
)
