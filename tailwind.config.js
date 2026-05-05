/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        heading: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        'svi-primary': '#012878',
        'svi-secondary': '#2F4F8F',
        'svi-light-blue': '#a3bbd2',
        'svi-dark-grey': '#4A4A4A',
        'svi-medium-grey': '#8A8A8A',
        'svi-light-grey': '#E5E7EB',
      },
    },
  },
  plugins: [],
};
