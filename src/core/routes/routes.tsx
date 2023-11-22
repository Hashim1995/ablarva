import React, { Suspense } from 'react';
import { Navigate } from 'react-router-dom';

// const LoginPage = React.lazy(() => import('@core/static-pages/login-page'));
import LoginPage from '@core/static-pages/login-page';

const LayoutPage = React.lazy(() => import('@core/layout/layout'));
const ChatPage = React.lazy(() => import('../../modules/chat/pages'));
const PricingPage = React.lazy(() => import('../../modules/pricing/pages'));

const routes = [
  {
    path: '/',
    element: <LayoutPage />,
    children: [
      { path: '/', element: <Navigate to="chat" /> },

      {
        index: true,
        path: 'chat',
        element: (
          <Suspense fallback={<div>fallback</div>}>
            <ChatPage />
          </Suspense>
        )
      },
      {
        path: 'pricing',
        element: (
          <Suspense fallback={<div>fallback</div>}>
            <PricingPage />
          </Suspense>
        )
      },
      {
        path: 'settings',
        element: (
          <Suspense fallback={<div>fallback</div>}>
            {' '}
            <h1>lorem*200</h1>
          </Suspense>
        )
      },
      {
        path: 'history',
        element: (
          <Suspense fallback={<div>fallback</div>}>
            {' '}
            <h1>tarixce</h1>
          </Suspense>
        )
      },

      {
        path: 'no-permission',
        element: <h1>no permission</h1>
      },
      {
        path: '404',
        element: <h1>404</h1>
      }
    ]
  },

  {
    path: 'login',
    element: <LoginPage />
  },

  {
    path: '*',
    element: <Navigate to="/404" />
  }
];

export default routes;
