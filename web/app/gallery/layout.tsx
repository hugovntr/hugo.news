import Link from "next/link";
import Image from "next/image";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <div>
            <div className="container">
                <Link href="/">
                    <Image
                        src={"https://avatars.githubusercontent.com/hugovntr"}
                        height={96}
                        width={96}
                        className="bg-muted mx-auto mt-4 h-12 w-12 rounded-full object-cover"
                        alt="Hugo Ventura"
                    />
                </Link>
            </div>
            <main className="py-24">{children}</main>
        </div>
    );
}
