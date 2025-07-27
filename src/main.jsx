import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const root = document.getElementById('root');
root.style.transform = 'scale(0.8)';
root.style.transformOrigin = 'top left';
root.style.width = '125vw';
root.style.height = '125vh';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
