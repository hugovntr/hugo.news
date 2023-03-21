import { FC } from "react";
import { allBlogs, allProjects } from "contentlayer/generated";
import Link from "next/link";
import { Mdx } from "@/components/mdx";

export const ProjectSection: FC = () => {
    return (
        <section className="py-16">
            <div className="container relative max-w-5xl">
                <div className="grid grid-cols-1 gap-8">
                    {allProjects.map((project) => (
                        <div key={project._id} className="flex">
                            <div>
                                <p className="text-2xl">{project.name}</p>
                                <p>{project.role}</p>
                            </div>
                            <Mdx code={project.body.code} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export const BlogSection: FC = () => {
    return (
        <section className="bg-gray-50 py-16">
            <div className="container relative max-w-5xl">
                <h2 className="mb-8">Blog</h2>
                <div className="grid grid-cols-3 gap-4">
                    {allBlogs.slice(-3).map((post) => (
                        <Link
                            href={`/blog/${post.slug}`}
                            key={post.slug}
                            className="group flex flex-col rounded-lg border border-gray-200/60 bg-white p-6 shadow-md shadow-gray-200/30"
                        >
                            <p className="mb-2 font-title text-lg font-medium">
                                {post.title}
                            </p>
                            <p className="mb-8 text-gray-600 line-clamp-2">
                                {post.body.raw}
                            </p>
                            <button className="mt-auto inline-flex items-center gap-1">
                                <span>Lire l&apos;article</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                    stroke="currentColor"
                                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4.5 4.5l15 15m0 0V8.25m0 11.25H8.25"
                                    />
                                </svg>
                            </button>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};
