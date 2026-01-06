export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    from: '#2563eb',
                    to: '#4f46e5',
                },
                secondary: {
                    from: '#fcd34d',
                    to: '#fb923c',
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
