/* eslint-disable global-require */
import { nextui } from '@nextui-org/react';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
    './node_modules/tailwind-datepicker-react/dist/**/*.js' // <--- Add this line
  ],

  theme: {
    fontSize: {
      xs: '8px',
      sm: '12px',
      base: '14px',
      xl: '16px',
      '2xl': '18px',
      '3xl': '20px'
    }
  },
  plugins: [
    // require('@tailwindcss/line-clamp'),
    nextui({
      addCommonColors: true,
      defaultTheme: 'light',

      themes: {
        light: {
          colors: {
            black: '#292D32',
            custom: 'red'
          }
        },
        dark: {
          colors: {
            black: '#292D32'
          }
        }
      }
    })
  ]
};
