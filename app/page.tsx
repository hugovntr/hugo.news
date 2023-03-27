import { NextPage } from "next";
import { CSSProperties, FC } from "react";
import { BlogSection, ProjectSection } from "@/app/sections";
import Link from "next/link";

const Page: NextPage = () => {
    const greetings = () => {
        const hours = new Date().getHours();
        if (hours >= 5 && hours < 11) return "Morning";
        if (hours >= 11 && hours < 17) return "Afternoon";
        return "Evening";
    };
    return (
        <>
            <header className="relative overflow-hidden bg-black py-24 md:py-32 lg:py-64">
                <div className="container grid max-w-6xl items-center gap-12 lg:grid-cols-2">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-widest text-emerald-400">
                            {greetings()}, I am
                        </p>
                        <h1 className="text-6xl text-white lg:text-8xl">
                            Hugo Ventura
                            <span className="text-emerald-400">.</span>
                        </h1>
                    </div>
                    <div className="flex flex-col gap-8">
                        <div className="flex flex-col gap-3 text-xl text-gray-400 lg:text-2xl">
                            <p>
                                <span className="bg-gradient-to-r from-pink-500 to-indigo-400 bg-clip-text font-semibold text-transparent">
                                    Software Engineer
                                </span>{" "}
                                and{" "}
                                <span className="bg-gradient-to-r from-indigo-400 to-emerald-400 bg-clip-text font-semibold text-transparent">
                                    Product Designer
                                </span>{" "}
                                with more than a decade of experience.
                            </p>
                            <p>
                                I am a full stack web developer, with an higher
                                interest for backend development.
                            </p>
                        </div>
                        <div className="flex flex-col items-center gap-4 md:flex-row">
                            <Link
                                className="flex bg-emerald-400 px-6 py-4 font-title text-xs font-bold uppercase tracking-widest text-emerald-900 transition-colors hover:bg-pink-400 hover:text-pink-900"
                                href={"/#projects"}
                                scroll={false}
                            >
                                Open Source Projects
                            </Link>
                            <Link
                                className="group flex items-center gap-2 px-6 py-4 font-title text-xs font-extrabold uppercase tracking-widest text-emerald-400"
                                href={"/blog"}
                            >
                                <span>Read the blog</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="h-5 w-5"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="-translate-x-3 transition-transform group-hover:translate-x-0"
                                        d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                                    />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </header>
            <ProjectSection />
            <BlogSection />
        </>
    );
};

const FullWidthText: FC<{
    text: string;
    className?: string;
    style?: CSSProperties | undefined;
}> = (props) => {
    const { text, className, style } = props;
    const chars = Array.from(text);
    const fontSize = 100 / chars.length;

    return (
        <p
            className={`grid select-none gap-0 ${className ?? ""}`}
            style={{
                gridTemplateColumns: `repeat(${chars.length}, 1fr)`,
                lineHeight: 0.8,
                ...style,
            }}
        >
            {chars.map((char) => (
                <span
                    key={char}
                    className="text-center"
                    style={{ fontSize: `${fontSize}vw` }}
                >
                    {char}
                </span>
            ))}
        </p>
    );
};

export default Page;
