import { useNavigate, useRoutes } from 'react-router-dom';
import { Suspense, useEffect } from 'react';
import routesList from '@core/routes/routes';
import { useDispatch, useSelector } from 'react-redux';
import { useDisclosure } from '@nextui-org/react';
import SuspenseLoader from './core/static-components/suspense-loader';
import { fetchUserData } from './redux/auth/auth-slice';
import { AppDispatch, RootState } from './redux/store';
import { setStatisticsCount } from './redux/statistics/statistics-slice';
import { StatisticsUpdateData } from './models/common';
import generateStatisticsSocket from './utils/functions/socket-config';
import VerifyEmail from './core/static-components/verify-email';

function App() {
  const router = useRoutes(routesList);
  const dispatch = useDispatch<AppDispatch>();

  // const { isDarkMode } = useDarkMode();

  const userToken: any = JSON.parse(localStorage.getItem('userToken') || '{}');
  const getme = useSelector((state: RootState) => state.user);
  const { verified } = useSelector((state: RootState) => state?.user?.user);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const navigate = useNavigate();

  useEffect(() => {
    if (!userToken?.token) {
      navigate('/login');
    } else {
      dispatch(fetchUserData());
    }
  }, []);

  useEffect(() => {
    if (userToken?.token && getme.user.currentSubscription) {
      const statisticsSocket = generateStatisticsSocket(
        JSON.parse(localStorage.getItem('userToken') || '{}').token
      );

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
      generateStatisticsSocket(userToken?.token).stop();
    };
  }, [getme]);

  useEffect(() => {
    if (!verified && getme?.user?.id) {
      onOpen();
    }
  }, [verified, getme]);
  return (
    <main
      className={`${
        ' bg-foreground-200'
        // isDarkMode
        //   ? 'dark h-screen text-foreground bg-background'
        //   : 'h-screen text-foreground bg-background'
      }`}
    >
      <Suspense fallback={<SuspenseLoader />}>
        {router}
        {isOpen && <VerifyEmail onOpenChange={onOpenChange} isOpen={isOpen} />}
      </Suspense>
    </main>
  );
}

export default App;
