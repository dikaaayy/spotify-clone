module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        spotifyCircular: "spotifyCircular",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
