/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
       colors: {
        app: {
          pink: '#DFC3FF !important',
          purple: {
            700: '#9D3DFF',
            600: '#7500FF',
            800: '#7400fe'
          },
          white: {
            100: "#f1e4ff"
          }
        },
      },
      borderRadius: {
        '4xl': '50px'
      },
      backgroundImage: {
        /* Application */
        login:
          'radial-gradient(ellipse 183.2% 359.66% at 82.99% 5.76%, rgba(117, 0, 255, 0.7) 0%, #FF4200 100%);',
        'side-bar-login':
          'radial-gradient(92.03% 72.64% at 75.94% 71.03%, #5832D2 0%, #BC00FF 100%)',
        tab: 'linear-gradient(180deg, #DFC3FF 0%, #C3ABDE 87.5%, #621AB2 100%)',
      },
      fontFamily: {
          'urbanist': "Urbanist, sans-serif",
          'montserrat': "Montserrat, serif",
      }
    },
  },
  plugins: [],
}

