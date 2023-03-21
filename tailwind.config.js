const { fontFamily } = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
        "./content/**/*.{md,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                title: ["var(--font-title)", "sans-serif"],
                sans: ["var(--font-sans)", ...fontFamily.sans],
            },
            colors: {
                gray: colors.neutral,
            },
            container: {
                center: true,
                padding: "1rem",
            },
        },
    },
    plugins: [
        require("@tailwindcss/typography"),
        require("@tailwindcss/line-clamp"),
    ],
};
