module.exports = {
  mode: 'jit',
  purge: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './features/**/*.{js,ts,jsx,tsx}',
    './node_modules/tw-elements/dist/js/**/*.js',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        worksans: ['WorkSans', 'sans-serif'],
        rational: ['Rational', 'sans-serif'],
      },
      animation: {
        fadein: 'fadein .5s',
        fadeout: 'fadeout .5s',
        'spin-slow': 'spin 9s linear infinite',
        arrow: 'arrow 2s infinite',
      },
      keyframes: {
        fadein: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        fadeout: {
          from: {
            opacity: 1,
          },
          to: {
            opacity: 0,
          },
        },
        arrow: {
          '0%': { opacity: 0 },
          '40%': { opacity: 1 },
          '80%': { opacity: 0 },
          '100%': { opacity: 0 },
        },
      },
      colors: {
        'background-dark': '#00000099',
      },
      transitionProperty: {
        height: 'height',
      },
      minWidth: {
        '1/2': '50%',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('tw-elements/dist/plugin'), require('tailwindcss-animation-delay')],
};
