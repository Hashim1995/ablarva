import { useNavigate, useRoutes } from 'react-router-dom';
import { Suspense, useEffect } from 'react';
import { useReadLocalStorage } from 'usehooks-ts';
import routesList from '@core/routes/routes';
import { useDispatch } from 'react-redux';
import SuspenseLoader from './core/static-components/suspense-loader';
import { fetchUserData } from './redux/auth/auth-slice';
import { AppDispatch } from './redux/store';
import statisticsSocket from './utils/functions/socket-config';
import { setStatisticsCount } from './redux/statistics/statistics-slice';
import { StatisticsUpdateData } from './models/common';

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

  useEffect(() => {
    if (userToken?.token) {
      if (statisticsSocket.state === 'Disconnected') {
        statisticsSocket
          .start()
          .then(() => {
            statisticsSocket.on(
              'StatisticsUpdate',
              (z: StatisticsUpdateData) => {
                dispatch(setStatisticsCount(z));
              }
            );
          })
          .catch(error => console.error('SignalR connection failed:', error));
      }
    }

    return () => {
      statisticsSocket.stop();
    };
  }, [dispatch]);

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
