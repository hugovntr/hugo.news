import type { NextPage } from "next";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowUpRight, Github, Twitter } from "lucide-react";
import { ThemeSwitcher } from "@/components/theme";
import Me from "./me.jpeg";
import {
    fetchCollections,
    fetchImage,
    fetchImages,
    NotionImageDatabaseItem,
} from "@hugo/notion";
import {
    ImageGallery,
    ImageGalleryFallback,
} from "@/components/gallery.server";
import { FC, Suspense, cache } from "react";
import { getImageInfos } from "@/lib/images";
import { cn } from "@/lib/utils";
import {
    ImageCollections,
    ImageCollectionsFallback,
} from "@/components/collections.server";

export const revalidate = 120;

const Page: NextPage = async () => {
    return (
        <>
            <div className="container max-w-xl py-24">
                <Image
                    src={Me}
                    className="bg-muted shadow-brand-200 dark:shadow-brand-950 mb-8 h-20 w-20 rounded-full object-cover shadow-2xl"
                    alt="Hugo Ventura"
                />
                <h1 className="font-title mb-2 text-3xl font-semibold">
                    Hello, I&apos;m Hugo
                </h1>
                <p>Software engineer & AI Researcher.</p>
                <p>Experimenting with Generative AI</p>
                <div className="mt-16 flex items-center justify-between">
                    <div className="grid grid-flow-col gap-2">
                        <Button asChild variant="outline" size="icon">
                            <Link href="https://x.com/hugovntr" target="_blank">
                                <svg
                                    className="h-4 w-4"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"
                                        fill="currentColor"
                                    />
                                </svg>
                            </Link>
                        </Button>
                        <Button asChild variant="outline">
                            <Link
                                href="https://github.com/hugovntr/hugo.news"
                                target="_blank"
                            >
                                {/* prettier-ignore */}
                                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" fill="currentColor"/></svg>
                                Source
                            </Link>
                        </Button>
                    </div>
                    <ThemeSwitcher />
                </div>
            </div>
            <div className="container mb-32">
                <div className="mx-auto mb-16 max-w-xl">
                    <h2 className="font-title text-2xl font-semibold">
                        Images
                    </h2>
                    <p>
                        The latest images that I generated using{" "}
                        <Button
                            variant="link"
                            className="px-0 text-base"
                            asChild
                        >
                            <Link
                                href="https://midjourney.com/"
                                target="_blank"
                            >
                                Midjourney
                            </Link>
                        </Button>{" "}
                        and/or{" "}
                        <Button
                            variant="link"
                            className="px-0 text-base"
                            asChild
                        >
                            <Link
                                href="https://github.com/AUTOMATIC1111/stable-diffusion-webui"
                                target="_blank"
                            >
                                Stable Diffusion
                            </Link>
                        </Button>
                    </p>
                </div>
                <Suspense fallback={<ImageGalleryFallback />}>
                    <Gallery />
                </Suspense>
            </div>
            <div className="container">
                <div className="mx-auto mb-16 max-w-xl">
                    <h2 className="font-title text-2xl font-semibold">
                        Collections
                    </h2>
                    <p>
                        All the images that I generated are grouped into
                        multiple collections, depending on the theme or the
                        actual &quot;collection&quot; they represent
                    </p>
                </div>
                <Suspense fallback={<ImageCollectionsFallback />}>
                    <ImageCollections collections={await fetchCollections()} />
                </Suspense>
            </div>
        </>
    );
};

const Gallery: FC = async () => {
    const data = await fetchImages({ page_size: 10 });

    return (
        <>
            <ImageGallery images={data.images} />
            {data.more && (
                <div className="mt-8 flex justify-center">
                    <Button asChild variant="ghost">
                        <Link href="/gallery/">
                            <span>View more</span>
                            <ArrowUpRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            )}
        </>
    );
};
export default Page;
