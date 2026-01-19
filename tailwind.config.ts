/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand Backgrounds (Deep Navy Palette)
        navy: {
          950: '#0F1020', // Main App Background
          900: '#181834', // Panel/Card Background
          800: '#1D1D44', // Surface Background
          700: '#2A2A5A', // Hover
        },
        // Brand Accents
        accent: {
          yellow: '#F2BB2F', // Primary Action
          purple: '#7C3AED', // Secondary/Glow
          cyan: '#22D3EE',   // Info/Data
        },
        // Mapped Semantics
        primary: {
          DEFAULT: '#F2BB2F', // Yellow Primary
          foreground: '#000000',
          50: '#fefce8',
          100: '#fef9c3',
          200: '#fef08a',
          300: '#fde047',
          400: '#facc15',
          500: '#eab308',
          600: '#ca8a04',
          700: '#a16207',
          800: '#854d0e',
          900: '#713f12',
        },
        // Keep neutrals for now, but they will be rarely used in dark mode
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        },
        success: {
          50: '#f0fdf4',
          100: '#dcfce7',
          500: '#22c55e',
          600: '#16a34a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Merriweather', 'serif'],
      },
      borderRadius: {
        'pill': '9999px',
        'card': '1rem',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
    },
  },
  plugins: [],
}