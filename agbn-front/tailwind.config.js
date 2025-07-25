const {heroui} = require('@heroui/theme');
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@heroui/theme/dist/components/modal.js"
  ],
  theme: {
    extend: {
      fontFamily: {
        exo: ['"exo"', "sans-serif"], // Utilisation: font-exo
        raleway: ['"raleway"', "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
      },
    },
  plugins: [heroui()],
  },
};
