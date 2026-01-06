/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    from: '#2563eb', // blue-600
                    to: '#4f46e5',   // indigo-600
                },
                secondary: {
                    from: '#fcd34d', // amber-300
                    to: '#fb923c',   // orange-400
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
