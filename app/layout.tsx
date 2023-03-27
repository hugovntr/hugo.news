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
            <body>
                <div className="flex items-center justify-center bg-gradient-to-r from-pink-500 via-indigo-400 to-emerald-400 py-1 font-bold">
                    <p className="mix-blend-soft-light">
                        This is a work in progress
                    </p>
                </div>
                {children}
            </body>
        </html>
    );
}
