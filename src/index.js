import ReactDOM from 'react-dom/client';
import React, { Suspense } from 'react';
import { store } from './store/Store';
import { Provider } from 'react-redux';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { BrowserRouter } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';

import App from './App';
import Spinner from './views/spinner/Spinner';

import './utils/i18n';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <Suspense fallback={<Spinner />}>
      <BrowserRouter
      // basename="/orbit"
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <App />
        </LocalizationProvider>
      </BrowserRouter>
    </Suspense>
  </Provider>,
);
