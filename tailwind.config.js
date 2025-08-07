/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
    "./app/globals.css",
  ],

  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#121212",
        secondary: "#40E0D0",
        tertiary: "#CFD0D0",
        accent: "#1C1C1E",
        background: "#000000",
        inactive: "#3C3C4399",
        active: "#00C7BE",
        text: "#FFFFFF",
        icongray: "#5F6368",
        boarderColor: "#CCCCCC",
        completedButton: "#181818",
        searchinputcolor: "#FAFAFAED",
        artblue: {
          600: "#007AFF",
          500: "#5A55F4",
          400: "#7797FF",
          300: "#A987FF",
        },
        artyellow: "#FCDB00",
        artgreen: "#12B76A",
        successgreen1: "#34C759",
        successgreen2: "#44C564",
        artgray: "#7B7D88",
        artorange: "#FC9E1D",
        artred: "#FF3B30",
        errorred: "#FF453A",

        light: {},
        dark: {},
        letterSpacing: "2px",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        serif: ["Merriweather", "serif"],
        clash: ["ClashDisplay-Regular", "Clash Display", "Nasalization"],
      },
    },
  },
  plugins: [],
};