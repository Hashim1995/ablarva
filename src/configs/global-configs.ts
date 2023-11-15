import { ToastOptions } from 'react-toastify';

const toastOptions: ToastOptions = {
  position: 'top-right',
  autoClose: 2000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: false,
  progress: undefined
};

const getTimeLineStyle = (token: any) => ({
  fontSize: token.fontSizeHeading4,
  marginBottom: token.marginXS,
  marginTop: '7px',
  padding: token.paddingXS,
  borderColor: token.colorPrimary,
  borderWidth: token.lineWidth,
  borderStyle: 'solid',
  borderRadius: token.borderRadius,
  color: token.colorPrimary
});

export { toastOptions, getTimeLineStyle };
