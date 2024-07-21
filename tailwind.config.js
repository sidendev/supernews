/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'], // Add Poppins font to the sans family
      },
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
  daisyui: {
    themes: [
      {
        light: {
          ...require('daisyui/src/theming/themes')['light'],
          primary: '#581c87', // purple-900
          secondary: '#a855f7', // purple-500
        },
      },
      {
        dark: {
          ...require('daisyui/src/theming/themes')['dark'],
          primary: '#581c87', // purple-900
          secondary: '#a855f7', // purple-500
        },
      },
    ],
    darkTheme: 'dark', // name of one of the included themes for dark mode
    lightTheme: 'light', // name of one of the included themes for light mode
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    themeRoot: ':root',
  },
};
