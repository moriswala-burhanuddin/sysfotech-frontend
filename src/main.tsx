import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { HelmetProvider } from 'react-helmet-async';

const rootElement = document.getElementById("root");

if (rootElement) {
  if (rootElement.hasChildNodes()) {
    hydrateRoot(
      rootElement,
      <HelmetProvider>
        <App />
      </HelmetProvider>
    );
  } else {
    createRoot(rootElement).render(
      <HelmetProvider>
        <App />
      </HelmetProvider>
    );
  }
}
