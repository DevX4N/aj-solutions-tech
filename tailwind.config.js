/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#08090D',
          900: '#0A0B10',
          800: '#0E1017',
          700: '#12141C',
          600: '#171A24',
        },
        line: 'rgba(255,255,255,0.09)',
        chalk: {
          DEFAULT: '#F3F5FB',
          dim: '#B7BECF',
          faint: '#7C8296',
        },
        electric: {
          DEFAULT: '#5B8CFF',
          bright: '#7AA2FF',
          deep: '#3B5BE0',
        },
        violet: {
          DEFAULT: '#8B6CFF',
        },
        cyan: {
          DEFAULT: '#43E6FF',
        },
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['"Hanken Grotesk"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.045em',
        tighter: '-0.03em',
      },
      maxWidth: {
        prose: '68ch',
      },
      boxShadow: {
        lift: '0 24px 60px -20px rgba(0,0,0,0.7), 0 8px 20px -12px rgba(0,0,0,0.6)',
        glow: '0 0 0 1px rgba(91,140,255,0.35), 0 20px 60px -22px rgba(91,140,255,0.55)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'grid-pan': {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '40px 40px' },
        },
      },
      animation: {
        marquee: 'marquee 38s linear infinite',
        'grid-pan': 'grid-pan 22s linear infinite',
      },
    },
  },
  plugins: [],
}
