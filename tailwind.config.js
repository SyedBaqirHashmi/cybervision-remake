/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        obsidian: '#0b0a08',
        midnight: '#171310',
        // shadcn/skiper-ui token bridge — maps their utility classes (bg-background,
        // border-border, bg-primary, …) onto the CSS variables defined in globals.css,
        // so community components inherit the brand palette instead of shadcn's defaults.
        background: 'hsl(var(--background) / <alpha-value>)',
        foreground: 'hsl(var(--foreground) / <alpha-value>)',
        card: { DEFAULT: 'hsl(var(--card) / <alpha-value>)', foreground: 'hsl(var(--card-foreground) / <alpha-value>)' },
        popover: { DEFAULT: 'hsl(var(--popover) / <alpha-value>)', foreground: 'hsl(var(--popover-foreground) / <alpha-value>)' },
        primary: { DEFAULT: 'hsl(var(--primary) / <alpha-value>)', foreground: 'hsl(var(--primary-foreground) / <alpha-value>)' },
        secondary: { DEFAULT: 'hsl(var(--secondary) / <alpha-value>)', foreground: 'hsl(var(--secondary-foreground) / <alpha-value>)' },
        muted: { DEFAULT: 'hsl(var(--muted) / <alpha-value>)', foreground: 'hsl(var(--muted-foreground) / <alpha-value>)' },
        accent: { DEFAULT: 'hsl(var(--accent) / <alpha-value>)', foreground: 'hsl(var(--accent-foreground) / <alpha-value>)' },
        destructive: 'hsl(var(--destructive) / <alpha-value>)',
        border: 'hsl(var(--border) / <alpha-value>)',
        input: 'hsl(var(--input) / <alpha-value>)',
        ring: 'hsl(var(--ring) / <alpha-value>)',
        chart: { 1: 'hsl(var(--chart-1) / <alpha-value>)', 2: 'hsl(var(--chart-2) / <alpha-value>)', 3: 'hsl(var(--chart-3) / <alpha-value>)', 4: 'hsl(var(--chart-4) / <alpha-value>)', 5: 'hsl(var(--chart-5) / <alpha-value>)' },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar) / <alpha-value>)', foreground: 'hsl(var(--sidebar-foreground) / <alpha-value>)',
          primary: 'hsl(var(--sidebar-primary) / <alpha-value>)', 'primary-foreground': 'hsl(var(--sidebar-primary-foreground) / <alpha-value>)',
          accent: 'hsl(var(--sidebar-accent) / <alpha-value>)', 'accent-foreground': 'hsl(var(--sidebar-accent-foreground) / <alpha-value>)',
          border: 'hsl(var(--sidebar-border) / <alpha-value>)', ring: 'hsl(var(--sidebar-ring) / <alpha-value>)'
        },
        gold: {
          50: '#fbf8f1',
          100: '#f4ead0',
          200: '#e9d4a0',
          300: '#dcbd72',
          400: '#cba052',
          500: '#b8893a',
          600: '#9c7230',
          700: '#7d5a27',
          800: '#5e441e',
          900: '#3f2d14',
          950: '#241a0c'
        },
        bronze: {
          50: '#fbf3ec',
          100: '#f2ddc9',
          200: '#e3bb92',
          300: '#d29b68',
          400: '#bd7f4c',
          500: '#a3673a',
          600: '#87532e',
          700: '#6b4025',
          800: '#4e2e1b',
          900: '#331d11',
          950: '#1d1009'
        }
      },
      fontFamily: { sans: ['Inter', 'Arial', 'sans-serif'], mono: ['ui-monospace', 'SFMono-Regular', 'monospace'] },
      fontSize: { display: ['clamp(2.55rem, 6.6vw, 6.5rem)', { lineHeight: '1.03', letterSpacing: '-0.065em' }] },
      boxShadow: { glow: '0 0 35px rgb(184 137 58 / .18)', 'glow-indigo': '0 0 60px rgb(163 103 58 / .15)' },
      backgroundImage: { 'accent-gradient': 'linear-gradient(110deg, #e9d4a0, #d29b68)', 'grid-pattern': 'linear-gradient(#ffffff05 1px, transparent 1px), linear-gradient(90deg, #ffffff05 1px, transparent 1px)' },
      keyframes: {
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-8px)' } },
        glow: { '0%,100%': { boxShadow: '0 0 0 rgb(184 137 58 / 0)' }, '50%': { boxShadow: '0 0 32px rgb(184 137 58 / .18)' } }
      },
      animation: { float: 'float 7s ease-in-out infinite', glow: 'glow 5s ease-in-out infinite' }
    }
  },
  plugins: []
};
