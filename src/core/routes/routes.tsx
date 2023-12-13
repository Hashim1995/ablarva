import React, { Suspense } from 'react';
import { Navigate } from 'react-router-dom';

// const LoginPage = React.lazy(() => import('@core/static-pages/login-page'));
import LoginPage from '@core/static-pages/login-page';
import SuspenseLoader from '../static-components/suspense-loader';

const LayoutPage = React.lazy(() => import('@core/layout/layout'));
const ChatPage = React.lazy(() => import('../../modules/chat/pages'));
const AssistanPage = React.lazy(() => import('../../modules/assistan/pages'));
const PricingPage = React.lazy(() => import('../../modules/pricing/pages'));
const SettingsPage = React.lazy(() => import('../../modules/settings/pages'));

const routes = [
  {
    path: '/',
    element: <LayoutPage />,
    children: [
      { path: '/', element: <Navigate to="chat" /> },

      {
        index: true,
        path: 'chat/*',
        element: (
          <Suspense fallback={<SuspenseLoader />}>
            <ChatPage />
          </Suspense>
        )
      },
      {
        path: 'assistan',
        element: (
          <Suspense fallback={<SuspenseLoader />}>
            <AssistanPage />
          </Suspense>
        )
      },
      {
        path: 'pricing',
        element: (
          <Suspense fallback={<SuspenseLoader />}>
            <PricingPage />
          </Suspense>
        )
      },
      {
        path: 'settings',
        element: (
          <Suspense fallback={<SuspenseLoader />}>
            <SettingsPage />
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
