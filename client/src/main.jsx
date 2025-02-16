import React from 'react';
import ReactDOM from 'react-dom/client'; // Importer depuis 'react-dom/client'
import App from './App';

// Crée un root avec createRoot
const root = ReactDOM.createRoot(document.getElementById('root'));

// Utiliser root.render pour rendre l'application
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
