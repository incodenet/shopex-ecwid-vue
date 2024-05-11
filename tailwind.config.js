/** @type {import('tailwindcss').Config} */
import { palette } from './src/constants'

export default {
  content: [],
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: palette.primary,
        common: palette.common,

        grey: {
          common: palette.grey.common,
          100: palette.grey[100],
          80: palette.grey[80],
          60: palette.grey[60],
          40: palette.grey[40],
          20: palette.grey[20],
          5: palette.grey[5]
        },

        danger: palette.danger.primary,
        'danger-secondary': palette.danger.secondary,
        success: palette.success.primary,
        'success-secondary': palette.success.secondary,
        info: palette.info.primary,
        'info-secondary': palette.info.secondary,
        'warning-secondary': palette.warning.secondary
      },
      borderRadius: {
        sm: '10px',
        md: '18px',
        lg: '33px'
      },
      padding: {
        primary: '40px'
      },
      boxShadow: {
        light: '0 0 20px rgba(36,36,36,.1)'
      },
      maxWidth: {},
      fontSize: {
        xs: '10px',
        sm: '12px',
        base: '16px',
        md: '18px',
        lg: '24px',
        xl: '32px'
      },
      flex: {
        0: '0 0 auto'
      },
      backdropBlur: {
        arrows: '1.175946593284607px'
      },
      transitionProperty: {
        'bg-color': 'background-color'
      },
      keyframes: {
        fadein: {
          '0%': { opacity: 0.3, transform: 'translateY(-7px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' }
        }
      },
      screens: {
        sm: '480px',
        md: '768px',
        lg: '1028px',
        xl: '1440px',
        xxl: '1600px'
      }
    }
  },
  plugins: []
}
