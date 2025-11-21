import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import App from './App.jsx'
import { PrimeReactProvider } from 'primereact/api'
import { LecturasProvider } from './providers/LecturasProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PrimeReactProvider>
      <LecturasProvider>
        <App />
      </LecturasProvider>
    </PrimeReactProvider>
  </StrictMode>,
)
