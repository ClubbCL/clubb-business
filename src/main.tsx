import './i18n';
import './index.css';

import { AuthProvider, CompanyProvider } from '@providers';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import { router } from './router.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CompanyProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </CompanyProvider>
  </React.StrictMode>
);
