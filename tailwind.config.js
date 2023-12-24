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
      }
    },
  },
  plugins: [],
}
