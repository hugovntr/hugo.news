import "./globals.css";
import React from "react";
import { Urbanist, Inter } from "next/font/google";

const titleFont = Urbanist({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-title",
});

const sansFont = Inter({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-sans",
});

export const metadata = {
    title: "Hugo Ventura.",
    description: "Senior Software Engineer & Product Designer",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html
            lang="en"
            className={`${titleFont.variable} ${sansFont.variable}`}
        >
            <body>{children}</body>
        </html>
    );
}
