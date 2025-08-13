import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
// Use the App.jsx in the same directory
import App from './App';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
