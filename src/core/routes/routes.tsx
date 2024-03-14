import React, { Suspense } from 'react';
import { Navigate } from 'react-router-dom';
import LoginPage from '@core/static-pages/login-page';
import EmailReportsPage from '@/modules/reports/pages/email-reports-page';

/**
 * Lazy loads the application routes.
 * @returns The application routes.
 * @see https://reactjs.org/docs/code-splitting.html
 * @see https://reactjs.org/docs/react-api.html#reactlazy
 * @see https://reactjs.org/docs/react-api.html#reactsuspense
 * @see https://reactjs.org/docs/react-api.html#reactsuspensefallback
 * @see https://reactrouter.com/web/guides/code-splitting
 * @see https://reactrouter.com/web/api/Suspense
 * @see https://reactrouter.com/web/api/Suspense/fallback-prop
 * @see https://reactrouter.com/web/api/Navigate
 * @see https://reactrouter.com/web/api/Outlet
 * @see https://reactrouter.com/web/api/Route
 *
 */

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

/**
 * Array of route objects that define the application routes.
 */
const routes = [
  {
    path: '/',
    element: <LayoutPage />,
    children: [
      { path: '/', element: <Navigate to="chat" /> },

      /**
       * Route for the chat page.
       */
      {
        index: true,
        path: 'chat/*',
        element: (
          <Suspense fallback={<SuspenseLoader />}>
            <ChatPage />
          </Suspense>
        )
      },
      /**
       * Route for the assistant home page.
       */
      {
        path: 'assistant-home',
        element: (
          <Suspense fallback={<SuspenseLoader />}>
            <AssistantHomePage />
          </Suspense>
        )
      },
      /**
       * Route for the assistant page.
       */
      {
        path: '/assistant',
        element: (
          <Suspense fallback={<SuspenseLoader />}>
            <AssistantPage />
          </Suspense>
        )
      },
      /**
       * Route for the cabinet page.
       */
      {
        path: 'cabinet',
        element: (
          <Suspense fallback={<SuspenseLoader />}>
            <CabinetPage />
          </Suspense>
        )
      },
      /**
       * Route for the settings page.
       */
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
      /**
       * Route for the reports page.
       */
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

  /**
   * Route for the login page.
   */
  {
    path: 'login',
    element: <LoginPage />
  },

  /**
   * Route for handling unknown paths.
   */
  {
    path: '*',
    element: <Navigate to="/404" />
  }
];

export default routes;
