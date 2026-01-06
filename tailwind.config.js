/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "#FDFCFB",
                foreground: "#1A1A1A",
                surface: "#F7F4F2",
                border: "#E5E0DC",
            },
            fontFamily: {
                sans: ["var(--font-plus-jakarta)", "Inter", "sans-serif"],
            },
        },
    },
    plugins: [],
};
