module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        brand: "Nunito, sans-serif"
      }
    }
  },
  plugins: [require("@tailwindcss/line-clamp")]
};
