import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    loader: async ({ request }) => {
      const endpoint = 'https://restcountries.com/v3.1/all';
      return fetch(endpoint, {
        signal: request.signal
      });
    }
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
