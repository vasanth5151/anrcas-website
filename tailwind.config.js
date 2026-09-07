/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Parkinsans', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#f0f9fe',
          100: '#dcf0fb',
          200: '#bce4f7',
          300: '#8cd2f1',
          400: '#45afdf', // accent
          500: '#179bd7', // primary
          600: '#0f7bb0',
          700: '#11628c',
          800: '#145374',
          900: '#154561',
          950: '#0d2c41',
        },
        ink: {
          DEFAULT: '#1c1c1c',
          50: '#f6f7f7',
          100: '#eceeee',
          200: '#d7dadb',
          300: '#b4babb',
          400: '#7f8c8d', // muted
          500: '#606b6c',
          600: '#4a5152',
          700: '#3a3f3f',
          800: '#2a2c2c',
          900: '#1c1c1c',
          950: '#111111',
        },
      },
      letterSpacing: {
        tightest: '-0.045em',
      },
      maxWidth: {
        shell: '1440px',
      },
      boxShadow: {
        card: '0 1px 2px rgba(16,24,40,.04), 0 12px 32px -12px rgba(16,24,40,.14)',
        lift: '0 2px 4px rgba(16,24,40,.05), 0 28px 60px -22px rgba(23,155,215,.35)',
        glow: '0 0 0 1px rgba(69,175,223,.35), 0 0 48px -12px rgba(23,155,215,.55)',
      },
      backgroundImage: {
        'grid-light':
          'linear-gradient(to right, rgba(23,155,215,.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(23,155,215,.07) 1px, transparent 1px)',
        'grid-dark':
          'linear-gradient(to right, rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,.05) 1px, transparent 1px)',
      },
      keyframes: {
        'marquee-x': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        orbit: {
          to: { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        marquee: 'marquee-x 38s linear infinite',
        float: 'float 7s ease-in-out infinite',
        orbit: 'orbit 22s linear infinite',
      },
      transitionTimingFunction: {
        premium: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
}
