import Link from "next/link";
import Image from "next/image";
import { getCollectionInfos } from "@/lib/images";
import { notFound } from "next/navigation";
import {
    ImageGallery,
    ImageGalleryFallback,
} from "@/components/gallery.server";
import { FC, Suspense } from "react";
import { RenderTexts } from "@/components/text.server";
import {
    fetchBlocks,
    fetchCollection,
    fetchCollectionImages,
    Block,
} from "../../../../../../packages/notion";

interface PageProps {
    params: {
        id: string;
    };
}

export const revalidate = 120;

export default async function Page({ params }: PageProps) {
    const { properties } = await fetchCollection(params.id);
    const infos = getCollectionInfos(properties);
    if (!infos) notFound();

    const { title } = infos;
    const blocks = await fetchBlocks(params.id);

    return (
        <>
            <div className="container mb-24 max-w-xl">
                <h1 className="font-title mb-2 text-2xl font-semibold">
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
        </>
    );
}

const Gallery: FC<{ id: string }> = async ({ id }) => {
    const { images } = await fetchCollectionImages(id);
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
