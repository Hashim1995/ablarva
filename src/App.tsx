/* eslint-disable no-unused-vars */
import { useNavigate, useRoutes } from 'react-router-dom';
import { Suspense, useEffect, useState } from 'react';
import { useReadLocalStorage, useLocalStorage, useDarkMode } from 'usehooks-ts';
import { useDispatch } from 'react-redux';
import routesList from '@core/routes/routes';
import SuspenseLoader from './core/static-components/suspense-loader';
import AuthLoader from './core/static-components/auth-loader';
import { setUser } from './redux/auth/auth-slice';
import {
  AuthService,
  IAuthResponse
} from './services/auth-services/auth-services';

function App() {
  const router = useRoutes(routesList);

  const [companyListLoader, setCompanyListLoader] = useState({
    status: false,
    message: ''
  });
  const [asanToken, setAsanToken] = useLocalStorage<any>('asanToken', null);
  const dispatch = useDispatch();
  const { isDarkMode } = useDarkMode();

  const userToken: any = useReadLocalStorage('userToken');

  const navigate = useNavigate();

  const getMe = async () => {
    try {
      setCompanyListLoader({
        status: true,
        message: 'Preparing user informations'
      });
      const res: IAuthResponse = await AuthService.getInstance().getUserData();
      dispatch(setUser(res?.Data));
    } catch (err) {
      setAsanToken(null);
      navigate('/login');
    } finally {
      setCompanyListLoader({
        status: false,
        message: ''
      });
    }
  };

  useEffect(() => {
    if (!asanToken) {
      // navigate('/login');
    } else if (!userToken) {
      //   navigate('/legal-entities');
    } else if (userToken) {
      // getMe();
    }
  }, [asanToken, userToken]);
  return (
    <main
      className={`${
        isDarkMode
          ? 'dark h-screen text-foreground bg-background'
          : 'h-screen text-foreground bg-background'
      }`}
    >
      {companyListLoader.status ? (
        <AuthLoader title={companyListLoader.message} />
      ) : (
        <Suspense fallback={<SuspenseLoader />}>{router}</Suspense>
      )}
    </main>
  );
}

export default App;
