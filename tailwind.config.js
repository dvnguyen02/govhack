/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: "rgb(245,235,220)", // Changed to a lighter beige
        foreground: "rgb(67,56,48)",
        // You can also add more beige variations if needed
        'beige-light': "rgb(250,240,230)",
        'beige-medium': "rgb(245,235,220)",
        'beige-dark': "rgb(240,230,220)",
      },
    },
  },
  plugins: [],
};