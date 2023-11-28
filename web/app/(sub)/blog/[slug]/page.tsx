import { ContentManager, renderContent } from "@/lib/content";
import { notFound } from "next/navigation";
import { blogMetaSchema } from "../schema";
import { Calendar, Pencil, Terminal } from "lucide-react";
import { dateFormat } from "@/utils/date";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const manager = new ContentManager("blog");
export default async function Page({ params }: { params: { slug: string } }) {
    const { slug } = params;
    if (!manager.exists(slug)) notFound();

    const { content, meta } = await manager.get(slug, blogMetaSchema);
    const { default: MDXContent } = await renderContent(content);

    return (
        <article className="prose dark:prose-invert container">
            <h1>{meta.title}</h1>
            <div className="flex items-center text-sm">
                <p className="inline-flex items-center gap-1">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <time
                        dateTime={meta.createdAt.toLocaleString()}
                        className="font-medium"
                    >
                        {dateFormat(meta.createdAt).format("ll")}
                    </time>
                </p>
                {meta.updatedAt && (
                    <p className="ml-4 inline-flex items-center text-indigo-500 dark:text-indigo-300">
                        <Pencil className="mr-1 h-4 w-4" />
                        <span>Edited on </span>
                        <time
                            dateTime={meta.updatedAt.toLocaleString()}
                            className="ml-1 font-medium"
                        >
                            {dateFormat(meta.updatedAt).format("ll")}
                        </time>
                    </p>
                )}
            </div>
            <hr />
            <MDXContent
                components={{
                    h1: "h2",
                    pre: ({ lang, className, ...props }) => {
                        return (
                            <div>
                                {lang && (
                                    <div
                                        className="mb-0 flex items-center gap-2 rounded-t-md border-b border-gray-700 px-4 py-3 text-xs font-medium capitalize text-white"
                                        style={props.style}
                                    >
                                        <Terminal className="h-4 w-4 text-gray-400" />
                                        <span>{lang}</span>
                                    </div>
                                )}
                                <pre
                                    className={cn(className, {
                                        "mt-0 rounded-t-none": !!lang,
                                    })}
                                    {...props}
                                />
                            </div>
                        );
                    },
                }}
            />
        </article>
    );
}

export async function generateStaticParams() {
    return manager.entries().map((slug) => ({ slug }));
}
