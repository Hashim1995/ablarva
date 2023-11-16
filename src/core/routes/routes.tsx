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
            <p className="text-xs">Lorem Ipsum xs</p>
            <p className="text-sm">Lorem Ipsum sm</p>
            <p className="text-md">Lorem Ipsum md</p>
            <p className="text-xl">Lorem Ipsum xl</p>
            <p className="text-2xl">Lorem Ipsum 2xl</p>
            <p className="text-3xl">Lorem Ipsum 3xl</p>
            <p className="text-4xl">Lorem Ipsum 4xl</p>
            <p className="text-5xl">Lorem Ipsum 5xl</p>
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
