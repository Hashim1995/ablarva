/* eslint-disable global-require */
import { nextui } from '@nextui-org/react';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],

  theme: {
    fontSize: {
      xs: '8px',
      sm: '12px',
      base: '14px',
      xl: '16px',
      '2xl': '18px',
      '3xl': '20px'
    },
    extend: {
      animation: {
        border: 'border 4s ease infinite'
      },
      keyframes: {
        border: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' }
        }
      }
    }
  },
  darkMode: 'class',
  plugins: [
    require('@tailwindcss/line-clamp'),
    nextui({
      addCommonColors: true,
      defaultTheme: 'dark',

      themes: {
        light: {
          colors: {
            black: '#0F0F0F',
            darkBlack: '#0F0F0F',
            custom: 'red'
          }
        },
        dark: {
          colors: {
            black: '#0F0F0F',
            darkBlack: '#0F0F0F',
            custom: 'red'
          }
        }
      }
    })
  ]
};
