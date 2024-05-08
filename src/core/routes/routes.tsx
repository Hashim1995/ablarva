import React, { Suspense } from 'react';
// import { Navigate } from 'react-router-dom';
import LoginPage from '@core/static-pages/login-page';
import EMALayoutPage from '@/modules/EMA/layout/EMA-layout';
import EmaDashboardPage from '@/modules/EMA/dashboard/pages/dashboard-page';
import EmaBillingPage from '@/modules/EMA/billing/pages/ema-billing-page';
import SenderInformationPage from '@/modules/EMA/sender-information/pages/sender-information-page';
import LeadsPage from '@/modules/EMA/leads/pages/leads-page';
import ConnectedMailsPage from '@/modules/EMA/connected-mails/pages/connected-mails-page';
import PendingMailsPage from '@/modules/EMA/pending-mails/pages/pending-mails-page';

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

const CabinetPage = React.lazy(() => import('@/modules/EMA/cabinet/pages'));

const SuspenseLoader = React.lazy(
  () => import('@core/static-components/suspense-loader')
);
const LayoutPage = React.lazy(() => import('@/core/layout/home/home-layout'));
const AssistantPage = React.lazy(() => import('@/modules/EMA/chat/pages'));
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
        path: 'chat',
        element: (
          <Suspense fallback={<SuspenseLoader />}>
            <AssistantPage />
          </Suspense>
        )
      },
      {
        path: 'leads',
        element: (
          <Suspense fallback={<SuspenseLoader />}>
            <LeadsPage />
          </Suspense>
        )
      },
      {
        path: 'connected-mails',
        element: (
          <Suspense fallback={<SuspenseLoader />}>
            <ConnectedMailsPage />
          </Suspense>
        )
      },
      {
        path: 'pending-mails',
        element: (
          <Suspense fallback={<SuspenseLoader />}>
            <PendingMailsPage />
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
      {
        path: 'sender-information',
        element: (
          <Suspense fallback={<SuspenseLoader />}>
            <SenderInformationPage />
          </Suspense>
        )
      },
      {
        path: 'billing',
        element: (
          <Suspense fallback={<SuspenseLoader />}>
            <EmaBillingPage />
          </Suspense>
        )
      }
    ]
  },
  {
    path: '*',
    element: <h1>404</h1>
  }
];

export default routes;
