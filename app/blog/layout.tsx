import { ReactNode } from "react";
import Link from "next/link";

export default function Layout(props: { children: ReactNode }) {
    return (
        <>
            <header className="container py-4">
                <Link
                    href={"/"}
                    className="inline-flex items-baseline font-title text-2xl font-bold"
                >
                    <span>Hugo Ventura</span>
                    <span className="ml-1 block h-2 w-2 rounded-full bg-emerald-400" />
                </Link>
            </header>
            {props.children}
        </>
    );
}
