/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // This is the magic line that enables the toggle

  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}