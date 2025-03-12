/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        mainBackgroundColor: "#E0E2DB",
        ColorGround: "#E0E2DB",
        secondBackgroundColor: "#B8BDB5",
        secondColor: "#5F7470",
        thirdColor: "#889696",
        primaryColor: "#2D3A37",
      },
      fontFamily: {
        Merienda: "Merienda",
      },
      boxShadow: {
        custom:
          "inset -11px -11px 10px rgba(0,0,0,.01), inset 11px 11px 10px rgba(0,0,0,.01)",
      },
      screens: {
        xs: "450px", // min-width: 400px
        // portrait: { raw: "(orientation: portrait)" }, // Custom media query
        // tablet: { min: "640px", max: "1023px" }, // Range for tablets
      },
    },
  },
  plugins: [],
};
