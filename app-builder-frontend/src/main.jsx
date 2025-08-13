import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
// Use the AppBuilder.jsx from the same directory
import App from './AppBuilder';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
