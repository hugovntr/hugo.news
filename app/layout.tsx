import "./globals.css";
import React from "react";
import { Urbanist, Inter } from "next/font/google";
import LocalFont from "next/font/local";
import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme";
import { Analytics } from "@vercel/analytics/react";

const titleFont = LocalFont({
    src: "./fonts/cabinetgrotesk/font.woff2",
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
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem={true}
                >
                    <main>{children}</main>
                    <footer className="mt-16 bg-muted py-16">
                        <div className="container flex justify-center">
                            <p className="text-sm text-muted-foreground">
                                &copy; {new Date().getFullYear()} • Hugo Ventura
                            </p>
                        </div>
                    </footer>
                    <Toaster />
                </ThemeProvider>
            </body>
        </html>
    );
}
