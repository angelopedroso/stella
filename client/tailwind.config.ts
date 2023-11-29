import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'surface-primary-dark': '#0d121d',
        'surface-primary': '#111827',
        background: {
          100: '#e6e8eb',
          700: '#091538',
          800: '#060c21',
          900: '#030712',
        },
      },
    },
  },
  plugins: [],
}
export default config
