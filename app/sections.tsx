import { FC } from "react";
import { allBlogs, allProjects, Blog, Project } from "contentlayer/generated";
import Link from "next/link";
import { Mdx } from "@/components/mdx";
import Image from "next/image";
import dayjs from "dayjs";
import { Flag } from "@/components/flags";

export const ProjectSection: FC = () => {
    return (
        <section className="py-16 md:py-24 lg:py-32" id="projects">
            <div className="container relative flex max-w-5xl flex-col">
                <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2">
                    {allProjects.map((project) => (
                        <Project {...project} key={project._id} />
                    ))}
                </div>
                <Link
                    className="flex items-center gap-2 self-center bg-white px-6 py-4 font-title text-sm font-bold uppercase tracking-widest text-black transition-colors hover:bg-pink-400 hover:text-pink-900"
                    href={"https://github.com/hugovntr"}
                    rel="nofollow noopener"
                >
                    <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-6 w-6"
                    >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M12 2C6.477 2 2 6.463 2 11.97c0 4.404 2.865 8.14 6.839 9.458.5.092.682-.216.682-.48 0-.236-.008-.864-.013-1.695-2.782.602-3.369-1.337-3.369-1.337-.454-1.151-1.11-1.458-1.11-1.458-.908-.618.069-.606.069-.606 1.003.07 1.531 1.027 1.531 1.027.892 1.524 2.341 1.084 2.91.828.092-.643.35-1.083.636-1.332-2.22-.251-4.555-1.107-4.555-4.927 0-1.088.39-1.979 1.029-2.675-.103-.252-.446-1.266.098-2.638 0 0 .84-.268 2.75 1.022A9.606 9.606 0 0112 6.82c.85.004 1.705.114 2.504.336 1.909-1.29 2.747-1.022 2.747-1.022.546 1.372.202 2.386.1 2.638.64.696 1.028 1.587 1.028 2.675 0 3.83-2.339 4.673-4.566 4.92.359.307.678.915.678 1.846 0 1.332-.012 2.407-.012 2.734 0 .267.18.577.688.48C19.137 20.107 22 16.373 22 11.969 22 6.463 17.522 2 12 2z"
                        ></path>
                    </svg>
                    <span>View more</span>
                </Link>
            </div>
        </section>
    );
};

const Project: FC<Project> = (props) => {
    return (
        <div
            key={props._id}
            className="flex flex-col border border-gray-200 p-6 pb-2"
        >
            {props.banner && (
                <figure className="group relative mb-8 aspect-video flex-shrink-0 overflow-hidden bg-gray-100">
                    <Image
                        src={props.banner}
                        fill={true}
                        className="scale-105 object-cover transition-transform duration-500 group-hover:scale-110"
                        alt={props.name}
                    />
                </figure>
            )}
            <div className="flex flex-1 flex-col">
                <p className="mb-1 font-title text-4xl font-bold">
                    {props.name}
                </p>
                <p className="mb-8 text-xs font-medium uppercase tracking-widest text-pink-600">
                    {props.role}
                </p>
                <Mdx
                    className="prose-xl mb-6 max-w-full flex-1"
                    code={props.body.code}
                />
                <Link
                    className="group flex items-center gap-2 py-4 font-title text-sm font-extrabold uppercase tracking-widest text-emerald-400"
                    href={props.link}
                    prefetch={false}
                    target="_blank"
                    rel="nofollow noopener"
                >
                    <span>Explore</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-6 w-6"
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
    );
};

export const BlogSection: FC = () => {
    return (
        <section className="bg-black py-16" id="blog">
            <div className="container relative max-w-5xl">
                <div className="grid grid-cols-1">
                    {allBlogs.slice(-3).map((post) => (
                        <BlogPost key={post.slug} {...post} />
                    ))}
                </div>
            </div>
        </section>
    );
};

const BlogPost: FC<Blog> = (props) => {
    const date = dayjs(props.publishedAt);
    return (
        <article className="flex items-start gap-6 py-6 first:pt-0 last:pb-0">
            <div className="flex h-full flex-col text-center font-title ordinal text-gray-800">
                <p className="text-3xl font-extrabold leading-none tracking-wide">
                    {date.format("DD")}
                </p>
                <p className="font-extrabold uppercase leading-none tracking-wider">
                    {date.format("MMM")}
                </p>
                <Flag lang={props.lang} className="mt-auto h-4 w-4" />
            </div>
            <div>
                <Link
                    className="group mb-2 flex items-center gap-2 font-extrabold text-gray-50 transition-colors hover:text-emerald-400"
                    href={`/blog/${props.slug}`}
                >
                    <p className="font-title text-2xl font-bold">
                        {props.title}
                    </p>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-8 w-8"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="-translate-x-3 opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100"
                            d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                        />
                    </svg>
                </Link>
                <p className="text-gray-500 line-clamp-2">{props.body.raw}</p>
            </div>
        </article>
    );
};
