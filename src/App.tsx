/* eslint-disable no-unused-vars */
import { useNavigate, useRoutes } from 'react-router-dom';
import { Suspense, useEffect, useState } from 'react';
import { useReadLocalStorage } from 'usehooks-ts';
import routesList from '@core/routes/routes';
import SuspenseLoader from './core/static-components/suspense-loader';

function App() {
  const router = useRoutes(routesList);

  // const { isDarkMode } = useDarkMode();

  const userToken: any = useReadLocalStorage('userToken');

  const navigate = useNavigate();

  useEffect(() => {
    if (!userToken) {
      navigate('/login');
    }
  }, [userToken]);
  return (
    <main
      className={`${
        ' bg-foreground-200'
        // isDarkMode
        //   ? 'dark h-screen text-foreground bg-background'
        //   : 'h-screen text-foreground bg-background'
      }`}
    >
      <Suspense fallback={<SuspenseLoader />}>{router}</Suspense>
    </main>
  );
}

export default App;
