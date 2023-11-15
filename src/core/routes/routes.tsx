import React, { Suspense } from 'react';
import { Navigate } from 'react-router-dom';

// const LoginPage = React.lazy(() => import('@core/static-pages/login-page'));
import LoginPage from '@core/static-pages/login-page';

const HomePage = React.lazy(() => import('@/modules/home/pages/index'));

const LayoutPage = React.lazy(() => import('@core/layout/layout'));

const routes = [
  {
    path: '/',
    element: <LayoutPage />,
    children: [
      { path: '/', element: <Navigate to="home" /> },
      {
        path: 'home',
        index: true,
        element: (
          <Suspense fallback={<div>fallback</div>}>
            <HomePage />{' '}
          </Suspense>
        )
      },
      {
        path: 'chat',
        element: (
          <Suspense fallback={<div>fallback</div>}>
            {' '}
            <h1>chat</h1>
          </Suspense>
        )
      },
      {
        path: 'pricing',
        element: (
          <Suspense fallback={<div>fallback</div>}>
            {' '}
            <h1>tarifler</h1>
          </Suspense>
        )
      },
      {
        path: 'settings',
        element: (
          <Suspense fallback={<div>fallback</div>}>
            {' '}
            <h1>tenzimleme</h1>
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
