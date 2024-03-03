import React, { Suspense } from 'react';
import { Navigate } from 'react-router-dom';
import LoginPage from '@core/static-pages/login-page';
import SuspenseLoader from '../static-components/suspense-loader';
import CabinetPage from '../../modules/cabinet/pages';

const LayoutPage = React.lazy(() => import('@core/layout/layout'));
const ChatPage = React.lazy(() => import('../../modules/chat/pages'));
const AssistanPage = React.lazy(() => import('../../modules/assistan/pages'));

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
        path: 'cabinet',
        element: (
          <Suspense fallback={<SuspenseLoader />}>
            <CabinetPage />
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
