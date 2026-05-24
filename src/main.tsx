import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './app/App';
import { applyTheme } from './lib/telegram';
import './index.css';

// Apply theme before React renders to prevent flash
applyTheme();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
