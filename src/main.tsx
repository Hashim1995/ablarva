/**
 * Entry point of the application.
 * Renders the root component and sets up the necessary providers.
 */
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import { NextUIProvider } from '@nextui-org/react';
import './i18n.ts';
import { Provider } from 'react-redux';
import { store } from '@redux/store';
import App from './App';
import '@core/style/global.scss';
import 'react-toastify/dist/ReactToastify.css';
import '@core/style/lib.scss';

// Render the root component to the 'root' element in the HTML document
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  /**
   * Wraps the application with necessary providers.
   * @remarks Provides the Redux store, React Router, and NextUI theme. Also includes the main application component and a container for displaying toast notifications.
   */
  <Provider store={store}>
    <BrowserRouter>
      <NextUIProvider>
        <>
          <App />
          <ToastContainer />
        </>
      </NextUIProvider>
    </BrowserRouter>
  </Provider>
);

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service.worker.js')
      .then((registration: ServiceWorkerRegistration) => {
        console.log('SW registered:', registration);
      })
      .catch((registrationError: Error) => {
        console.log('SW registration failed:', registrationError);
      });
  });
}
