import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cream: '#faf9f5',
        ink: '#0a0a0a',
        lime: '#ccff00',
        'dark-green': '#4d7c0f',
        'ghost-pink': '#fde3ea',
        violet: '#4c2bd9',
        'light-indigo': '#e0e7ff',
        'glitch-pink': '#ff2d75',
        'glitch-cyan': '#00c2ff',
        card: '#ffffff',
      },
      fontFamily: {
        display: ['Anton', 'Bebas Neue', 'Impact', 'sans-serif'],
        mono: ['JetBrains Mono', 'Space Mono', 'Noto Sans JP', 'Noto Sans SC', 'monospace'],
        body: ['Inter Tight', 'Bricolage Grotesque', 'Inter', 'sans-serif'],
        jp: ['Noto Sans JP', 'sans-serif'],
        sc: ['Noto Sans SC', 'sans-serif'],
      },
      boxShadow: {
        'brutal-sm': '2px 2px 0px #0a0a0a',
        'brutal': '4px 4px 0px #0a0a0a',
        'brutal-lg': '6px 6px 0px #0a0a0a',
        'brutal-lime-sm': '3px 3px 0px #ccff00',
        'brutal-lime': '6px 6px 0px #ccff00',
        'brutal-lime-lg': '8px 8px 0px #ccff00',
        'brutal-pink': '4px 4px 0px #ff2d75',
        'brutal-cyan': '4px 4px 0px #00c2ff',
      },
      borderWidth: {
        '3': '3px',
      },
      screens: {
        xs: '360px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
    },
  },
  plugins: [],
} satisfies Config;
