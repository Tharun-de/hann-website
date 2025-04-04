import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#e5e7eb',
            lineHeight: '1.75',
          },
        },
      },
    },
  },
  plugins: [
    typography,
  ],
};