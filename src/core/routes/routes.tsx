import React, { Suspense } from 'react';
import { Navigate } from 'react-router-dom';
import AssistantHomePage from '@/modules/assistant/pages/home';
import LoginPage from '@core/static-pages/login-page';
import SettingsPage from '@/modules/settings/pages';
import SmptpPage from '@/modules/settings/pages/smtp-page';
import HistoryPage from '@/modules/settings/pages/history-page';
import EmailPage from '@/modules/settings/pages/email-page';
import SuspenseLoader from '../static-components/suspense-loader';
import CabinetPage from '../../modules/cabinet/pages';

const LayoutPage = React.lazy(() => import('@core/layout/layout'));
const ChatPage = React.lazy(() => import('../../modules/chat/pages'));
const AssistantPage = React.lazy(() => import('../../modules/assistant/pages'));

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
        path: 'assistant-home',
        element: (
          <Suspense fallback={<SuspenseLoader />}>
            <AssistantHomePage />
          </Suspense>
        )
      },
      {
        path: '/assistant',
        element: (
          <Suspense fallback={<SuspenseLoader />}>
            <AssistantPage />
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
        path: 'settings/*',
        element: (
          <Suspense fallback={<SuspenseLoader />}>
            <SettingsPage />
          </Suspense>
        ),
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<SuspenseLoader />}>
                <SmptpPage />
              </Suspense>
            )
          },
          {
            path: 'payment-history',
            element: (
              <Suspense fallback={<SuspenseLoader />}>
                <HistoryPage />
              </Suspense>
            )
          },
          {
            path: 'email',
            element: (
              <Suspense fallback={<SuspenseLoader />}>
                <EmailPage />
              </Suspense>
            )
          }
        ]
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
