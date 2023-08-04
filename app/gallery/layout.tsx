import type { ReactNode } from "react";
import Me from "@/app/me.jpeg";
import Image from "next/image";
import Link from "next/link";

interface LayoutProps {
    children: ReactNode;
}

export default async function Layout({ children }: LayoutProps) {
    return (
        <>
            <div className="container">
                <Link href="/">
                    <Image
                        src={Me}
                        className="mx-auto mt-4 h-12 w-12 rounded-full bg-muted object-cover"
                        alt="Hugo Ventura"
                    />
                </Link>
            </div>
            {children}
        </>
    );
}
