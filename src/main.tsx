import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { SchemaProvider } from './store/store.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
   <SchemaProvider>
     <App />
   </SchemaProvider>
  </StrictMode>,
)
