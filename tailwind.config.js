/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      gridTemplateColumns: {
        '1fr/auto': '1fr auto',
        'auto/1fr': 'auto 1fr'
      },
      width: {
        '63': 'calc(63 * 1rem / 4)',
      },
      transitionProperty: {
        'button': 'transform 0.1s ease-out, color 0.15s linear',
      },
      scale: {
        '80': '.80'
      }
    },
  },
  plugins: [],
}
