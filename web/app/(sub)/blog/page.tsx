import Link from "next/link";
import { ContentManager } from "@/lib/content";
import { cache, Suspense } from "react";
import { blogMetaSchema } from "@/app/(sub)/blog/schema";
import { dateFormat } from "@/utils/date";
import { ArrowUpRight, Calendar, Pencil } from "lucide-react";
import { BlogHeader, BlogSkeleton } from "@/app/(sub)/blog/shared";
import { Badge } from "@/components/ui/badge";

const manager = new ContentManager("blog");
const getArticles = cache(async () => {
    let articles: Awaited<
        ReturnType<typeof manager.get<typeof blogMetaSchema>>
    >[] = [];
    for (const entry of manager.entries()) {
        articles.push(await manager.get(entry, blogMetaSchema));
    }
    return articles;
});

export default async function Page() {
    return (
        <div className="container">
            <BlogHeader />
            <Suspense fallback={<BlogSkeleton />}>
                <Articles />
            </Suspense>
        </div>
    );
}

const Articles = async () => {
    const articles = await getArticles();

    return (
        <div className="grid gap-16 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
                <Link
                    href={article.meta.uri}
                    key={article.slug}
                    className="flex"
                >
                    <article className="flex items-center justify-between gap-4">
                        <div className="flex h-full flex-1 flex-col">
                            <h2 className="mb-2 text-lg font-semibold">
                                {article.meta.title}
                            </h2>
                            <p className="mb-4 line-clamp-2">
                                {article.meta.summary}
                            </p>
                            <div className="mt-auto flex items-center text-xs">
                                <p className="inline-flex items-center gap-1">
                                    <Calendar className="h-4 w-4 text-gray-500" />
                                    <time
                                        dateTime={article.meta.createdAt.toLocaleString()}
                                        className="font-medium"
                                    >
                                        {dateFormat(
                                            article.meta.createdAt
                                        ).format("ll")}
                                    </time>
                                </p>
                                {article.meta.updatedAt && (
                                    <p className="ml-4 inline-flex gap-1 text-indigo-500 dark:text-indigo-300">
                                        <Pencil className="h-4 w-4" />
                                        <time
                                            dateTime={article.meta.updatedAt.toLocaleString()}
                                            className="font-medium"
                                        >
                                            {dateFormat(
                                                article.meta.updatedAt
                                            ).format("ll")}
                                        </time>
                                    </p>
                                )}
                            </div>
                        </div>
                        <ArrowUpRight className="h-5 w-5 flex-shrink-0" />
                    </article>
                </Link>
            ))}
        </div>
    );
};
