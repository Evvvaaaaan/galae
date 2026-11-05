import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Capacitor } from '@capacitor/core';

if (Capacitor.isNativePlatform()) document.documentElement.classList.add('native');

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
