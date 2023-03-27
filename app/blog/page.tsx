import { NextPage } from "next";
import { FC } from "react";
import { allBlogs, Blog } from "contentlayer/generated";
import { Flag } from "@/components/flags";
import Link from "next/link";
import { sortByDateDesc, dateFormat } from "@/utils/date";

export const metadata = {
    title: "Blog — Hugo Ventura.",
};

const Page: NextPage = () => {
    return (
        <>
            <div className="bg-black">
                <div className="container max-w-6xl py-24 md:py-32">
                    <h1 className="text-6xl text-white lg:text-8xl">Blog</h1>
                </div>
            </div>
            <section className="container max-w-4xl">
                <div className="grid grid-cols-1 gap-16 py-16">
                    {allBlogs.sort(sortByDateDesc).map((post) => (
                        <BlogPost key={post._id} {...post} />
                    ))}
                </div>
            </section>
        </>
    );
};

const BlogPost: FC<Blog> = (props) => {
    const date = dateFormat(props.createdAt);
    return (
        <article className="flex items-start gap-6">
            <div className="flex h-full flex-shrink-0 flex-col items-start text-center font-title ordinal text-gray-300">
                <p className="text-3xl font-extrabold leading-none tracking-wide">
                    {date.format("DD")}
                </p>
                <p className="font-extrabold uppercase leading-none tracking-wider">
                    {date.format("MMM")}
                </p>
            </div>
            <div>
                <Link
                    className="group mb-2 flex items-center gap-2 font-extrabold transition-colors hover:text-emerald-400"
                    href={`/blog/${props.slug}`}
                >
                    <p className="font-title text-4xl font-bold">
                        {props.title}
                    </p>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="mt-0.5 h-8 w-8"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="-translate-x-3 opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100"
                            d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                        />
                    </svg>
                </Link>
                <div className="mb-4 flex items-center gap-4">
                    {props.tags && (
                        <div className="flex items-center gap-2">
                            {props.tags?.map((tag) => (
                                <button
                                    className="bg-gray-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-violet-900"
                                    key={tag}
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>
                    )}
                    <span className="block h-px flex-1 border border-dashed border-gray-200" />
                    <Flag lang={props.lang} className="h-5 w-5" />
                </div>
                <p className="text-lg text-gray-600 line-clamp-4">
                    {props.body.raw}
                </p>
            </div>
        </article>
    );
};

export default Page;
