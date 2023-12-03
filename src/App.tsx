import { useNavigate, useRoutes } from 'react-router-dom';
import { Suspense, useEffect } from 'react';
import { useReadLocalStorage } from 'usehooks-ts';
import routesList from '@core/routes/routes';
import { useDispatch } from 'react-redux';
import SuspenseLoader from './core/static-components/suspense-loader';
import { fetchUserData } from './redux/auth/auth-slice';
import { AppDispatch } from './redux/store';

function App() {
  const router = useRoutes(routesList);
  const dispatch = useDispatch<AppDispatch>();

  // const { isDarkMode } = useDarkMode();

  const userToken: any = useReadLocalStorage('userToken');

  const navigate = useNavigate();

  useEffect(() => {
    if (!userToken?.token) {
      navigate('/login');
    } else {
      dispatch(fetchUserData());
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
