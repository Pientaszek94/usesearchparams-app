import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


// const store=configureStore({reducer:{}})

root.render(
  <React.StrictMode>
    {/* <Provider store={store}> */}

       <App />

    {/* </Provider> */}
  </React.StrictMode>
);
