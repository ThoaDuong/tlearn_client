function extracted() {
  /** @type {import('tailwindcss').Config} */
  export default {
    content: ["./src/**/*.{js,jsx,ts,tsx}",],
    theme: {
      extend: {
        colors: {
          hihi: 'red'
        },
        keyframes: {
          'slide-in': {
            '0%': {transform: 'translateX(-100%)', opacity: '0'},
            '100%': {transform: 'translateX(0)', opacity: '1'},
          },
          'slideY-in': {
            '0%': {transform: 'translateY(-30%)', opacity: '0'},
            '100%': {transform: 'translateY(0)', opacity: '1'},
          },
          'slideY-out': {
            '0%': {transform: 'translateY(0)', opacity: '1'},
            '100%': {transform: 'translateY(-30%)', opacity: '0'},
          },
        },
        animation: {
          'slide-in': 'slide-in 0.5s ease-out forwards',
          'slideY-in': 'slideY-in 0.5s ease-in-out forwards',
          'slideY-out': 'slideY-out 0.5s ease-in-out forwards',
        },
      },
    },
    plugins: [],
  }
}

extracted();

