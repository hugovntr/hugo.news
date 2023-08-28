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
                                <Twitter className="h-4 w-4" />
                            </Link>
                        </Button>
                        <Button asChild variant="outline" size="icon">
                            <Link
                                href="https://github.com/hugovntr"
                                target="_blank"
                            >
                                <Github className="h-4 w-4" />
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

const Collections: FC = async () => {
    const collections = await fetchCollections();
    const imageIds = collections
        .map((collection) =>
            (collection.properties.Images.relation as { id: string }[])
                .slice(0, 3)
                .reduce((acc, cur) => [...acc, cur.id], [] as string[])
        )
        .reduce((acc, cur) => [...acc, ...cur], [])
        .filter((v, i, s) => s.indexOf(v) === i);

    const images: NotionImageDatabaseItem[] = [];
    for (const imageId of imageIds) {
        const i = cache(() => fetchImage(imageId));
        images.push(await i());
    }

    function getCollectionImages(id: string) {
        return images.filter((image) => {
            return (image.properties.Collections.relation as { id: string }[])
                .reduce((acc, cur) => [...acc, cur.id], [] as string[])
                .includes(id);
        });
    }

    return (
        <>
            <div className="grid grid-cols-4 gap-16">
                {collections.map((collection) => {
                    const colImages = getCollectionImages(collection.id);
                    const totalImages = (
                        collection.properties.Images.relation as any[]
                    ).length;
                    return (
                        <Link
                            href={`/gallery/collections/${collection.id}`}
                            key={collection.id}
                            className="flex flex-col"
                        >
                            <div className="grid aspect-square grid-cols-2 grid-rows-2 overflow-hidden rounded-t-md lg:rounded-md">
                                {colImages.map((image) => {
                                    const {
                                        url,
                                        title,
                                        prompt: { height, width },
                                    } = getImageInfos(image.properties);
                                    return (
                                        <div
                                            key={image.id}
                                            className={cn({
                                                "col-span-2 row-span-2":
                                                    colImages.length === 1,
                                                "row-span-2":
                                                    colImages.length === 2,
                                                "last:col-span-2":
                                                    colImages.length === 3,
                                            })}
                                        >
                                            <Image
                                                className="h-full w-full object-cover object-center"
                                                src={url}
                                                alt={title}
                                                height={height / 3}
                                                width={width / 3}
                                                loading="lazy"
                                                quality={60}
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="flex justify-between">
                                <p className="font-title font-semibold">
                                    {
                                        collection.properties.Name.title[0]
                                            .plain_text
                                    }
                                </p>
                                <Badge variant="outline">
                                    {totalImages} images
                                </Badge>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </>
    );
};
export default Page;
