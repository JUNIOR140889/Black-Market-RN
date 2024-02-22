/** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss/plugin');
const { default: flattenColorPalette } = require('tailwindcss/lib/util/flattenColorPalette');

const tColors = require('./src/ui/theme/colors');
const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    g: ({ theme }) => theme('spacing'), // gap nativewind < 2.0
    colors: {
      ...colors,
      ...tColors,
    },
    extend: {
      fontFamily: {
        primary: ['Poppins'],
      },
    },
  },
};
