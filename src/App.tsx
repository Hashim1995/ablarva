/* eslint-disable no-unused-vars */
import { useNavigate, useRoutes } from 'react-router-dom';
import { Suspense, useEffect, useState } from 'react';
import { useReadLocalStorage } from 'usehooks-ts';
import routesList from '@core/routes/routes';
import { useDispatch } from 'react-redux';
import SuspenseLoader from './core/static-components/suspense-loader';
import {
  AuthService,
  IGetMeResponse
} from './services/auth-services/auth-services';
import { IUserLoggedData } from './models/user';
import { setUser } from './redux/auth/auth-slice';

function App() {
  const router = useRoutes(routesList);
  const disptach = useDispatch();

  // const { isDarkMode } = useDarkMode();

  const getMe = async () => {
    try {
      const res: IGetMeResponse = await AuthService.getInstance().getMe();
      const userSlicePayload: IUserLoggedData = res.data;
      disptach(setUser(userSlicePayload));
    } catch (err) {
      console.log(err);
    }
  };

  const userToken: any = useReadLocalStorage('userToken');

  const navigate = useNavigate();

  useEffect(() => {
    if (!userToken?.token) {
      navigate('/login');
    } else {
      getMe();
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
