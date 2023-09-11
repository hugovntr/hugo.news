import { FC, Suspense } from "react";
import { getImageInfos } from "@/lib/images";
import { PromptPopover } from "@/app/prompt.client";
import { Masonry } from "@/components/masonry";
import Link from "next/link";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { NotionImageDatabaseItem } from "@hugo/notion";
import { CollectionsBadges } from "@/components/collections.server";
import { ImageClient } from "@/components/gallery.client";

const masonryProps = {
    className: "flex gap-4",
    columnClassName: "flex flex-col gap-4",
    breakpointCols: { default: 5, 1100: 4, 1000: 3, 700: 2, 500: 1 },
};

export const ImageGallery: FC<{ images: NotionImageDatabaseItem[] }> = (
    props
) => {
    const { images } = props;
    return (
        <Masonry {...masonryProps}>
            {images.map((image) => (
                <ImageWrapper key={image.id} {...image} />
            ))}
        </Masonry>
    );
};

export const ImageGalleryFallback: FC = () => (
    <Masonry {...masonryProps}>
        {[
            2 / 3,
            2 / 3,
            4 / 3,
            16 / 9,
            2 / 3,
            2 / 3,
            2 / 3,
            2 / 3,
            16 / 9,
            4 / 3,
            2 / 3,
            2 / 3,
        ].map((ar) => (
            <Skeleton
                style={{ aspectRatio: ar }}
                className="rounded-lg"
                key={ar}
            />
        ))}
    </Masonry>
);

const ImageWrapper: FC<NotionImageDatabaseItem> = (props) => {
    const { properties } = props;
    const infos = getImageInfos(properties);
    if (!infos) return null;
    const { prompt, share, title, url, collectionIds } = infos;

    return (
        <div>
            <div className="relative flex flex-col overflow-hidden rounded-lg border lg:border-none">
                <Link
                    href={`/gallery/images/${props.id}`}
                    className="h-full"
                    prefetch={false}
                    style={{
                        aspectRatio: prompt.aspectRatio.split(":").join("/"),
                    }}
                >
                    <ImageClient
                        className="bg-muted h-full w-full rounded-t-md lg:rounded-md"
                        src={url}
                        alt={title}
                        height={prompt.height / 3}
                        width={prompt.width / 3}
                        loading="lazy"
                        quality={75}
                        placeholder="empty"
                    />
                </Link>
                <div className="bg-background text-popover-foreground inset-x-0 bottom-0 flex flex-col items-start px-4 py-3 backdrop-blur backdrop-saturate-150 lg:absolute lg:bg-neutral-950/10 lg:text-white">
                    <p className="font-title line-clamp-1 text-sm font-semibold">
                        {title}
                    </p>
                </div>
                <div className="absolute right-2 top-2 flex">
                    {share && <PromptPopover {...prompt} />}
                </div>
                <div className="absolute bottom-14 right-2">
                    <CollectionsBadges
                        ids={collectionIds}
                        className="flex-col items-end"
                        variant="backdrop"
                    />
                </div>
            </div>
        </div>
    );
};
