import "./globals.css";
import React from "react";
import { Montserrat, Inter } from "next/font/google";
import LocalFont from "next/font/local";
import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme";

// const titleFont = LocalFont({
//     src: "./fonts/cabinetgrotesk/font.woff2",
//     display: "swap",
//     variable: "--font-title",
// });

const titleFont = Montserrat({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-title",
});

const sansFont = Inter({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-sans",
});

export const metadata: Metadata = {
    title: "Hugo Ventura.",
    description: "Senior Software Engineer & AI Researcher",
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
        },
    },
    twitter: {
        title: "Hugo Ventura.",
        card: "summary_large_image",
    },
};

interface RootLayoutProps {
    children: React.ReactNode;
    modal: React.ReactNode;
}
export default function RootLayout(props: RootLayoutProps) {
    const { children, modal } = props;
    return (
        <html
            lang="en"
            className={`${titleFont.variable} ${sansFont.variable}`}
        >
            <body>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem={true}
                >
                    <main>{children}</main>
                    <Toaster />
                    {modal}
                </ThemeProvider>
            </body>
        </html>
    );
}
