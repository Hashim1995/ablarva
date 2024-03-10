import React, { Suspense } from 'react';
import { Navigate } from 'react-router-dom';
import LoginPage from '@core/static-pages/login-page';
import EmailReportsPage from '@/modules/reports/pages/email-reports-page';

const AssistantHomePage = React.lazy(
  () => import('@/modules/assistant/pages/home')
);
const SettingsPage = React.lazy(() => import('@/modules/settings/pages'));
const SmptpPage = React.lazy(
  () => import('@/modules/settings/pages/smtp-page')
);
const ReportsPage = React.lazy(() => import('@/modules/reports/pages'));
const HistoryPage = React.lazy(
  () => import('@/modules/reports/pages/history-page')
);
const CabinetPage = React.lazy(() => import('@/modules/cabinet/pages'));
const EmailPage = React.lazy(
  () => import('@/modules/settings/pages/email-page')
);
const SuspenseLoader = React.lazy(
  () => import('@core/static-components/suspense-loader')
);
const LayoutPage = React.lazy(() => import('@core/layout/layout'));
const ChatPage = React.lazy(() => import('@/modules/chat/pages'));
const AssistantPage = React.lazy(() => import('@/modules/assistant/pages'));

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
        path: 'reports/*',
        element: (
          <Suspense fallback={<SuspenseLoader />}>
            <ReportsPage />
          </Suspense>
        ),
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<SuspenseLoader />}>
                <HistoryPage />
              </Suspense>
            )
          },
          {
            path: 'email-reports',
            element: (
              <Suspense fallback={<SuspenseLoader />}>
                <EmailReportsPage />
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
