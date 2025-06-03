/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6', // Blue
        secondary: '#1F2937', // Dark gray
        accent: '#10B981', // Green
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}