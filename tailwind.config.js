/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.html", "./*.md", "./_posts/**/*.md", "./assets/**/*.js"],
  theme: {
    extend: {
      typography: {
        DEFAULT: {},
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/container-queries"),
  ],
};
