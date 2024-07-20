/** @type {import('tailwindcss').Config} */
export const content = [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
];
export const theme = {
  extend: {
    colors: {
      customGray: 'rgb(223, 230, 237) ',
      navbar: "#10898d"
    },
  },
};
export const plugins = [];