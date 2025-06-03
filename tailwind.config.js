/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6', // Blue for buttons and accents
        secondary: '#1F2937', // Dark gray for background
        accent: '#10B981', // Green for success states
      },
    },
  },
  plugins: [],
}