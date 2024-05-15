import React, { Suspense } from 'react';
import LoginPage from '@core/static-pages/login-page';
import EMALayoutPage from '@/modules/EMA/layout/EMA-layout';
import EmaDashboardPage from '@/modules/EMA/dashboard/pages/dashboard-page';
import TermsandConditionsPage from '../static-pages/terms-conditions-page';

const CabinetPage = React.lazy(() => import('@/modules/EMA/cabinet/pages'));
const SuspenseLoader = React.lazy(
  () => import('@core/static-components/suspense-loader')
);
const LayoutPage = React.lazy(() => import('@/core/layout/home/home-layout'));
const AssistantPage = React.lazy(() => import('@/modules/EMA/chat/pages'));
const HomePage = React.lazy(() => import('@/modules/home/pages/home-page'));
const PendingMailsPage = React.lazy(
  () => import('@/modules/EMA/pending-mails/pages/pending-mails-page')
);
const ConnectedMailsPage = React.lazy(
  () => import('@/modules/EMA/connected-mails/pages/connected-mails-page')
);
const LeadsPage = React.lazy(
  () => import('@/modules/EMA/leads/pages/leads-page')
);
const SenderInformationPage = React.lazy(
  () => import('@/modules/EMA/sender-information/pages/sender-information-page')
);
const EmaBillingPage = React.lazy(
  () => import('@/modules/EMA/billing/pages/ema-billing-page')
);

/**
 * Application routes for various pages in the app, including login, marketing, and dashboards.
 * This configuration includes route paths, their corresponding React components, and the
 * use of `Suspense` with fallback loaders to handle asynchronous page loading.
 *
 * @summary Application route configuration.
 * @module Routes
 * @exports routes
 * @example
 * // Usage with a router setup (e.g., React Router):
 * import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
 * import routes from './path/to/routes-file';
 * function App() {
 *   const routing = useRoutes(routes);
 *   return <Router>{routing}</Router>;
 * }
 *
 * @type {Array<Object>} routes - Array of route objects with path, element, and nested routes.
 * @property {string} path - The route path.
 * @property {JSX.Element} element - The main component to render for the route.
 * @property {Array<Object>} [children] - Nested route objects for sub-pages.
 * @property {boolean} [index] - If `true`, indicates that this route is the index (default) route.
 * @property {string} [path='*'] - Catch-all route for 404 handling.
 * @property {JSX.Element} [fallback] - The fallback loader component to show while a page is loading.
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
      },
      {
        path: 'terms-conditions',
        element: <TermsandConditionsPage />
      }
    ]
  },
  {
    path: 'email-marketing',
    element: <EMALayoutPage />,
    children: [
      {
        index: true,
        element: <EmaDashboardPage />
      },
      {
        index: true,
        path: 'dashboard',
        element: <EmaDashboardPage />
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
