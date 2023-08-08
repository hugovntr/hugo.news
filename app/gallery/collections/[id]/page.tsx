import Link from "next/link";
import Image from "next/image";
import Me from "@/app/me.jpeg";
import {
    getCollection,
    getCollectionImages,
    getCollectionInfos,
    getImage,
    getImageInfos,
} from "@/lib/images";
import { PromptPopoverContent } from "@/app/prompt.client";
import { Copyright } from "@/components/copyright";
import { cn } from "@/lib/utils";
import { Metadata } from "next";
import { createHmac } from "node:crypto";
import { notFound } from "next/navigation";
import type { OGPayload } from "@/app/api/og/route";
import { ImageCollections } from "@/components/collections.server";
import {
    ImageGallery,
    ImageGalleryFallback,
} from "@/components/gallery.server";
import { Block, getBlocks } from "@/lib/content";
import { FC, Suspense } from "react";
import { RenderTexts } from "@/components/text.server";

interface PageProps {
    params: {
        id: string;
    };
}

export default async function Page({ params }: PageProps) {
    const { properties } = await getCollection(params.id);
    const infos = getCollectionInfos(properties);
    if (!infos) notFound();

    const { title } = infos;
    const blocks = await getBlocks(params.id);

    return (
        <div>
            <div className="container my-4">
                <Link href="/">
                    <Image
                        src={Me}
                        className="mx-auto h-12 w-12 rounded-full bg-muted object-cover"
                        alt="Hugo Ventura"
                    />
                </Link>
            </div>
            <div className="container max-w-xl py-24">
                <h1 className="mb-2 font-title text-2xl font-semibold">
                    {title}
                </h1>
                {blocks.map((b) => (
                    <RenderBlock key={b.id} {...b} />
                ))}
            </div>
            <div className="container">
                <Suspense fallback={<ImageGalleryFallback />}>
                    <Gallery id={params.id} />
                </Suspense>
            </div>
        </div>
    );
}

const Gallery: FC<{ id: string }> = async ({ id }) => {
    const { images } = await getCollectionImages(id);
    return <ImageGallery images={images} />;
};

const RenderBlock: FC<Block> = (block) => {
    const { type } = block;
    const value = block[type];

    switch (type) {
        case "paragraph":
            // prettier-ignore
            return <p><RenderTexts elements={value.rich_text} /></p>
        case "heading_1":
            // prettier-ignore
            return <h1><RenderTexts elements={value.rich_text} /></h1>
        case "heading_2":
            // prettier-ignore
            return <h2><RenderTexts elements={value.rich_text} /></h2>
        case "heading_3":
            // prettier-ignore
            return <h3><RenderTexts elements={value.rich_text} /></h3>
        default:
            break;
    }
    return null;
};
