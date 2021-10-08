module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        "places-main-img": "url('/src/assets/images/placesmainback.jpg')",
        "places-kivu-img": "url('/src/assets/images/kivu2.jpg')",
        "places-tea-img": "url('/src/assets/images/cyohoha.jpg')",
        "places-foot-img": "url('/src/assets/images/ruganzu.jpg')",
      }),
      colors: {
        "nav-link-active": "rgba(255, 222, 95, 1)",
        "header-color": "#8B0000",
        "main-button-color": "rgba(81, 113, 75, 1)",
        "home-second-gradient":
          "linear-gradient(to bottom right, #fafadd, #ded7e7, #4ae1ee)",
        "violent-color": "#b45ad3",
        "gradient-1": "#fafadf",
        "gradient-2": "#e4d0dc",
        "gradient-3": "#8eb2df",
        "gradient-4": "#58daf5",
        "gradient-5": "#ecfafa",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
