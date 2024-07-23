// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,vue}",
    "./components/**/*.{js,ts,vue}",
    "./layouts/**/*.{js,ts,vue}",
    "./plugins/**/*.{js,ts,vue}",
    "./nuxt.config.{js,ts}"
  ],
  theme: {
    extend: {
      colors: {
        bars: '#111827',
      },
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      boxShadow: {
        'inner-custom': 'inset 0 4px 6px rgba(0, 0, 0, 0.1), inset 0 -1px 0 rgba(0, 0, 0, 0.1)',
      }
    },
  },
  plugins: [],
}
