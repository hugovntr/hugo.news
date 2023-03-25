import { FC } from "react";
import { allBlogs, allProjects, Blog } from "contentlayer/generated";
import Link from "next/link";
import { Mdx } from "@/components/mdx";
import Image from "next/image";
import dayjs from "dayjs";

export const ProjectSection: FC = () => {
    return (
        <section className="py-16 md:py-24 lg:py-32" id="projects">
            <div className="container relative max-w-5xl">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    {allProjects.map((project) => (
                        <div
                            key={project._id}
                            className="flex flex-col border border-gray-200 p-6 pb-2"
                        >
                            {project.banner && (
                                <figure className="group relative mb-8 aspect-video flex-shrink-0 overflow-hidden bg-gray-100">
                                    <Image
                                        src={project.banner}
                                        fill={true}
                                        className="scale-105 object-cover transition-transform duration-500 group-hover:scale-110"
                                        alt={project.name}
                                    />
                                </figure>
                            )}
                            <div className="flex flex-1 flex-col">
                                <p className="mb-1 font-title text-4xl font-bold">
                                    {project.name}
                                </p>
                                <p className="mb-8 text-xs font-medium uppercase tracking-widest text-pink-600">
                                    {project.role}
                                </p>
                                <Mdx
                                    className="prose-xl mb-6 max-w-full flex-1"
                                    code={project.body.code}
                                />
                                <Link
                                    className="group flex items-center gap-2 py-4 font-title text-sm font-extrabold uppercase tracking-widest text-emerald-400"
                                    href={project.link}
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
                    ))}
                </div>
            </div>
        </section>
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
            <div className="text-center font-title ordinal text-gray-800">
                <p className="text-3xl font-extrabold leading-none tracking-wide">
                    {date.format("DD")}
                </p>
                <p className="font-extrabold uppercase leading-none tracking-wider">
                    {date.format("MMM")}
                </p>
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
