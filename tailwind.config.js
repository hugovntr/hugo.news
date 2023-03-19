/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
        "./content/**/*.{md,mdx}",
    ],
    theme: {
        extend: {},
    },
    plugins: [require("@tailwindcss/typography")],
};
