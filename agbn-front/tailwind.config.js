export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        exo: ['"exo"', "sans-serif"], // Utilisation: font-exo
        raleway: ['"raleway"', "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
      },
    },
    plugins: [],
  },
};
