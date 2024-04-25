import React, { Suspense } from 'react';
// import { Navigate } from 'react-router-dom';
import LoginPage from '@core/static-pages/login-page';
import EmailReportsPage from '@/modules/EMA/reports/pages/email-reports-page';
import EMALayoutPage from '@/modules/EMA/layout/EMA-layout';
import EmaDashboardPage from '@/modules/EMA/dashboard/pages/dashboard-page';

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

const SettingsPage = React.lazy(() => import('@/modules/EMA/settings/pages'));
const SmptpPage = React.lazy(
  () => import('@/modules/EMA/settings/pages/smtp-page')
);
const ReportsPage = React.lazy(() => import('@/modules/EMA/reports/pages'));
const HistoryPage = React.lazy(
  () => import('@/modules/EMA/reports/pages/history-page')
);
const CabinetPage = React.lazy(() => import('@/modules/cabinet/pages'));
const EmailPage = React.lazy(
  () => import('@/modules/EMA/settings/pages/email-page')
);
const SuspenseLoader = React.lazy(
  () => import('@core/static-components/suspense-loader')
);
const LayoutPage = React.lazy(() => import('@/core/layout/home/home-layout'));
const AssistantPage = React.lazy(() => import('@/modules/EMA/assistant/pages'));
const HomePage = React.lazy(() => import('@/modules/home/pages/home-page'));

/**
 * Array of route objects that define the application routes.
 */
const routes = [
  {
    path: '/',
    element: <LayoutPage />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<SuspenseLoader />}>
            <HomePage />
          </Suspense>
        )
      },
      {
        path: 'login',
        element: <LoginPage />
      }
    ]
  },
  {
    path: 'email-marketing',
    element: <EMALayoutPage />,
    children: [
      /**
       * Route for the assistant home page.
       */
      /**
       * Route for the assistant page.
       */

      // { path: '/email-marketing', element: <Navigate to="dashboard" /> }, // Redirect to dashboard
      {
        index: true,
        element: <EmaDashboardPage /> // Your actual dashboard component
      },
      {
        index: true,
        path: 'dashboard',
        element: <EmaDashboardPage /> // Your actual dashboard component
      },
      {
        path: '*',
        element: <h1>404</h1>
      },
      {
        path: 'assistant',
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
      }
    ]
  },

  /**
   * Route for the login page.
   */

  /**
   * Route for handling unknown paths.
   */
  {
    path: '*',
    element: <h1>404</h1>
  }
];

export default routes;
