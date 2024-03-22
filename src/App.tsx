import { useNavigate, useRoutes } from 'react-router-dom';
import { Suspense, useEffect } from 'react';
import routesList from '@core/routes/routes';
import { useDispatch, useSelector } from 'react-redux';
import { useDisclosure } from '@nextui-org/react';
import { useMediaQuery } from 'usehooks-ts';
import SuspenseLoader from './core/static-components/suspense-loader';
import { fetchUserData } from './redux/auth/auth-slice';
import { AppDispatch, RootState } from './redux/store';
import { setStatisticsCount } from './redux/statistics/statistics-slice';
import { StatisticsUpdateData } from './models/common';
import generateStatisticsSocket from './utils/functions/socket-config';
import VerifyEmail from './core/static-components/verify-email';

/**
 * The main component of the application. It renders the routes and handles user authentication and verification.
 * @returns The main component of the application.
 */

function App() {
  const router = useRoutes(routesList);
  const dispatch = useDispatch<AppDispatch>();
  const isResponsive = useMediaQuery('(max-width: 1024px)');

  const userToken: any = JSON.parse(localStorage.getItem('userToken') || '{}');
  const getme = useSelector((state: RootState) => state.user);
  const { verified } = useSelector((state: RootState) => state?.user?.user);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const navigate = useNavigate();

  /*
    This useEffect is responsible for handling user authentication and navigation.
    If the user token is not available, it navigates to the login page.
    Otherwise, it dispatches the fetchUserData action to retrieve user data.
  */
  useEffect(() => {
    const mode = import.meta.env.VITE_APP_MODE; // 'development' or 'production'
    document.title = mode === 'development' ? '(Dev) AI Zade' : 'AI Zade';

    if (!userToken?.token) {
      navigate('/login');
    } else {
      dispatch(fetchUserData());
    }
  }, []);

  /*
    This useEffect is responsible for handling the statistics socket connection and updating the statistics count.
    It only runs when the screen size is not responsive. This is to prevent multiple socket connections on mobile devices.
    If the user token and current subscription are available, it creates a statistics socket and starts the connection.
    When a 'StatisticsUpdate' event is received, it dispatches the setStatisticsCount action to update the statistics count in the Redux store.
    If the socket connection fails, an error is logged to the console.
    When the component is unmounted, the socket connection is stopped. 
  */

  useEffect(() => {
    if (!isResponsive) {
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
    }
    return () => {
      generateStatisticsSocket(userToken?.token).stop();
    };
  }, [getme, isResponsive]);

  /*
    This useEffect is responsible for checking if the user's email is verified.
    If the email is not verified and the user ID is available, it opens the email verification modal.
    It listens for changes in the 'verified' and 'getme' variables.
  */
  useEffect(() => {
    if (!verified && getme?.user?.id) {
      onOpen();
    }
  }, [verified, getme]);
  return (
    <main className="gradient-bg overflow-y-hidden">
      <Suspense fallback={<SuspenseLoader />}>
        {router}
        {isOpen && <VerifyEmail onOpenChange={onOpenChange} isOpen={isOpen} />}
      </Suspense>
    </main>
  );
}

export default App;
