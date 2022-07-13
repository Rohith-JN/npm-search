/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}", 
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ['class'],
  theme: {
    typography: (theme) => ({}),
    extend: {}, 
    screens: {
      'xsm': {'max': '300px'},
      'sm': {'max': '350px'},
      'xmd': {'max': '390px'},
      'md': {'max': '600px'},
      'slg': {'max': '700px'},
      'lg': {'max': '960px'},
      'xlg': {'max': '1199px'},
      'xl': {'max': '1200px'},
      'mmd': {'min': '600px'}
    }
  },
  variants: {},
  plugins: [require('@tailwindcss/typography')],
}