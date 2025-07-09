/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",  // All JS, JSX, TS, TSX files inside src folder
    "./public/index.html"          // Also scan your public/index.html if needed
  ],
  theme: {
    extend: {
      // Add custom colors, fonts, or other theme extensions here if needed
    },
  },
  plugins: [],
};

