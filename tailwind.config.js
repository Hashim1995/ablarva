import { nextui } from '@nextui-org/react';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],

  darkMode: 'class',
  theme: {
    extend: {
      // backgroundImage: {
      //   'login-pattern': "url('/src/assets/bgai.png')",
      //   'footer-texture': "url('/img/footer-texture.png')"
      // }
    }
  },
  plugins: [
    nextui({
      addCommonColors: true,
      defaultTheme: 'light',
      themes: {
        light: {
          colors: {
            black: '#292D32'
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
