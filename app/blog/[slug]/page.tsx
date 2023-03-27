import { allBlogs, Blog } from "contentlayer/generated";
import type { Metadata, NextPage } from "next";
import { notFound } from "next/navigation";
import { Mdx } from "@/components/mdx";
import { Flag } from "@/components/flags";
import { FC } from "react";
import Link from "next/link";
import { NextRequest } from "next/server";
import { dateFormat } from "@/utils/date";

type Params = {
    slug: string;
};

export async function generateStaticParams() {
    return allBlogs.map((doc) => ({ slug: doc.slug }));
}

export async function generateMetadata({
    params,
}: {
    params: Params;
}): Promise<Metadata | undefined> {
    const post = allBlogs.find((doc) => doc.slug === params.slug);
    if (!post) return;

    return {
        title: post.title,
    };
}

const plural = (count: number, singular: string, plural?: string): string =>
    count === 1 ? singular : plural ?? `${singular}s`;

const Page: NextPage<{ request: NextRequest; params: Params }> = (props) => {
    const {
        params: { slug },
    } = props;
    const post = allBlogs.find((doc) => doc.slug === slug);
    if (!post) notFound();

    return (
        <section className="container max-w-4xl py-16 lg:py-24">
            <article>
                <header className="mb-8 border-b border-gray-100 pb-8">
                    <Link
                        className="group -ml-6 flex items-center gap-2 px-6 py-4 font-title text-xs font-extrabold uppercase tracking-widest text-emerald-400"
                        href={"/blog"}
                    >
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
                                className="translate-x-3 transition-transform group-hover:translate-x-0"
                                d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                            />
                        </svg>
                        <span>Blog</span>
                    </Link>
                    <h1 className="mb-8 text-6xl">{post.title}</h1>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                        <time dateTime={post.createdAt}>
                            {dateFormat(post.createdAt).format("DD MMMM YYYY")}
                        </time>
                        <span className="text-gray-300">—</span>
                        <Flag lang={post.lang} className="h-5 w-5" />
                        <span className="text-gray-300">—</span>
                        <p>
                            ~{post.readingTime}{" "}
                            {plural(post.readingTime, "minute")}
                        </p>
                    </div>
                </header>
                <Mdx code={post.body.code} className="prose-lg max-w-full" />
            </article>

            {/* TODO: Find a better way to pass the link */}
            <ShareActions
                title={post.title}
                link={`https://hugo.news/blog/${post.slug}`}
            />
        </section>
    );
};

const ShareActions: FC<{ link: string; title: Blog["title"] }> = (props) => {
    const shareUrls = {
        twitter: new URL(
            `https://twitter.com/intent/tweet?url=${encodeURIComponent(
                props.link
            )}&text=${props.title} 🌐&via=hugovntr`
        ),
    };

    return (
        <div className="mt-12 flex flex-col items-center gap-2">
            <p>Share this article</p>
            <Link
                href={shareUrls.twitter.toString()}
                target={"_blank"}
                className="text-gray-600 transition-colors hover:text-emerald-400"
            >
                <svg
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="currentColor"
                >
                    <path d="M24 4.6a10 10 0 0 1-2.9.7 5 5 0 0 0 2.2-2.7c-1 .6-2 1-3.1 1.2a5 5 0 0 0-8.4 4.5A14 14 0 0 1 1.6 3.2 4.8 4.8 0 0 0 1 5.6a5 5 0 0 0 2.2 4.1 4.9 4.9 0 0 1-2.3-.6A5 5 0 0 0 5 14a5 5 0 0 1-2.2 0 5 5 0 0 0 4.6 3.5 9.9 9.9 0 0 1-6.1 2.1H0a14 14 0 0 0 7.6 2.2c9 0 14-7.5 14-14V7A10 10 0 0 0 24 4.6z" />
                </svg>
            </Link>
        </div>
    );
};

export default Page;
