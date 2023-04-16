import React from 'react';
import App from './Components/App';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store';
import { HashRouter } from 'react-router-dom';

const root = createRoot(document.querySelector('#root'));

root.render(
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>
);