/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        brand: {
          green: '#038458',
          'green-light': '#17A977',
          'green-pale': '#E8F8F0',
          'green-dark': '#027A53',
        },
        text: {
          heading: '#343A40',
          body: '#4B5563',
          muted: '#6B7280',
        },
        bg: {
          white: '#FFFFFF',
          light: '#F8F9FA',
          footer: '#038458',
        },
        border: {
          light: '#E5E8E8',
        },
      },
      fontFamily: {
        sans: ['Gilroy', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        'hero': ['3rem', { lineHeight: '1.15', fontWeight: '700' }],
        'hero-mobile': ['2rem', { lineHeight: '1.2', fontWeight: '700' }],
        'h1': ['2.25rem', { lineHeight: '1.2', fontWeight: '700' }],
        'h2': ['1.75rem', { lineHeight: '1.3', fontWeight: '600' }],
        'h3': ['1.25rem', { lineHeight: '1.4', fontWeight: '600' }],
        'body': ['1.0625rem', { lineHeight: '1.6', fontWeight: '400' }],
        'small': ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }],
        'nav': ['1rem', { lineHeight: '1.5', fontWeight: '500' }],
        'btn': ['1rem', { lineHeight: '1.5', fontWeight: '600' }],
      },
      maxWidth: {
        'content': '1200px',
      },
      borderRadius: {
        'card': '8px',
        'btn': '6px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
