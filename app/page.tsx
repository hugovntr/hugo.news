import { NextPage } from "next";
import { CSSProperties, FC } from "react";
import { BlogSection, ProjectSection } from "@/app/sections";

const Page: NextPage = () => {
    return (
        <>
            <header className="relative overflow-hidden py-32 lg:py-64">
                <div className="absolute inset-0">
                    <div className="absolute inset-0 -z-10 w-2/3 bg-gray-900 lg:w-1/2" />
                    <div className="pointer-events-none absolute inset-0 z-10 text-gray-500 opacity-5 mix-blend-screen blur-lg">
                        <FullWidthText
                            text={"HUGO"}
                            className="mb-16 font-black"
                        />
                        <FullWidthText
                            text={"VENTURA"}
                            className="font-black"
                        />
                    </div>
                </div>
                <div className="container">
                    <div className="relative w-2/3 lg:w-1/2">
                        <h1 className="mb-4 text-white">Hugo Ventura.</h1>
                        <p className="text-xl text-gray-400">
                            Senior Software Engineer & Product Designer
                        </p>
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
