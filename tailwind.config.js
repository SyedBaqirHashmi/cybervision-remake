/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: { obsidian: '#030712', midnight: '#0f172a', electric: '#06b6d4', neon: '#6366f1' },
      fontFamily: { sans: ['Inter', 'Arial', 'sans-serif'], mono: ['ui-monospace', 'SFMono-Regular', 'monospace'] },
      fontSize: { display: ['clamp(2.55rem, 6.6vw, 6.5rem)', { lineHeight: '1.03', letterSpacing: '-0.065em' }] },
      boxShadow: { glow: '0 0 35px rgb(6 182 212 / .18)', 'glow-indigo': '0 0 60px rgb(99 102 241 / .15)' },
      backgroundImage: { 'accent-gradient': 'linear-gradient(110deg, #a5f3fc, #a5b4fc)', 'grid-pattern': 'linear-gradient(#ffffff05 1px, transparent 1px), linear-gradient(90deg, #ffffff05 1px, transparent 1px)' },
      keyframes: {
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-8px)' } },
        glow: { '0%,100%': { boxShadow: '0 0 0 rgb(6 182 212 / 0)' }, '50%': { boxShadow: '0 0 32px rgb(6 182 212 / .18)' } }
      },
      animation: { float: 'float 7s ease-in-out infinite', glow: 'glow 5s ease-in-out infinite' }
    }
  },
  plugins: []
};
