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

const inputConfig = {
  inputWrapper: [
    'relative',
    'w-full',
    'inline',
    'inline-flex',
    'tap-highlight-transparent',
    'shadow-sm',
    'min-h-unit-8',
    'flex-col',
    'items-start',
    'justify-center',
    'gap-0',
    'border',
    ' px-3',
    'py-1',
    'rounded-md',
    ' h-8',
    'data-[hover=true]:border-[#292D32]',
    'group-data-[focus=true]:border-gray-200',
    'border-[#292D32]',
    'transition-background',
    '!duration-150 ',
    'transition-colors',
    '',
    'motion-reduce:transition-none '
  ],
  innerWrapper: 'h-fit  text-xs',
  input: ' font-light '
};

export { toastOptions, inputConfig, getTimeLineStyle };
