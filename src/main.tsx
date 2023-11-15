import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import { NextUIProvider } from '@nextui-org/react';

import { Provider } from 'react-redux';
import { store } from '@redux/store';
import App from './App';
import '@core/style/global.scss';
import 'react-toastify/dist/ReactToastify.css';
import '@core/style/lib.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
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
