import React from 'react';
import App from './Components/App';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';

const root = createRoot(document.querySelector('#root'));

root.render(
  <HashRouter>
    <App />
  </HashRouter>
);

//test