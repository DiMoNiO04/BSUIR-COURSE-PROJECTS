/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        orange: '#ff642f',
        pink: '#ffd7c9',
        blue: '#e3f1ff',
        black: '#000000',
        grey: '#7f7f7f',
        greyLight: '#e8e8e8',
        whiteDark: '#f9f9f9',
        white: '#ffffff',
        red: '#dc3545',
      },
      fontFamily: {
        interRegular: ['Inter-Regular', 'sans-serif'],
        interMedium: ['Inter-Medium', 'sans-serif'],
        interBold: ['Inter-Bold', 'sans-serif'],
        playfairRegular: ['Playfair-Regular', 'serif'],
        playfairMedium: ['Playfair-Medium', 'serif'],
        playfairBold: ['Playfair-Bold', 'serif'],
      },
    },
  },
  plugins: [],
};
