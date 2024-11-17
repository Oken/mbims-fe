import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';

import { store } from './store';

import { Provider } from 'react-redux';

import './style/css/feather.css';
import './style/css/line-awesome.min.css';
import './style/scss/main.scss';
import './style/icons/fontawesome/css/fontawesome.min.css';
import './style/icons/fontawesome/css/all.min.css';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
