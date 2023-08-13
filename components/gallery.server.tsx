import { FC } from "react";
import { getImageInfos, ImageDatabaseItem } from "@/lib/images";
import { PromptPopover } from "@/app/prompt.client";
import { Masonry } from "@/components/masonry";
import Link from "next/link";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";

const masonryProps = {
    className: "flex gap-4",
    columnClassName: "flex flex-col gap-4",
    breakpointCols: { default: 4, 1100: 3, 700: 2, 500: 1 },
};

export const ImageGallery: FC<{ images: ImageDatabaseItem[] }> = (props) => {
    const { images } = props;
    return (
        <Masonry
            className="flex gap-4"
            columnClassName="flex flex-col gap-4"
            breakpointCols={{
                default: 4,
                1100: 3,
                700: 2,
                500: 1,
            }}
        >
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

const ImageWrapper: FC<ImageDatabaseItem> = (props) => {
    const { properties } = props;
    const infos = getImageInfos(properties);
    if (!infos) return null;
    const { prompt, share, title, url } = infos;

    return (
        <div>
            <div className="relative flex flex-col overflow-hidden rounded-lg bg-muted/80 p-2 dark:bg-muted/50">
                <Link
                    href={`/gallery/images/${props.id}`}
                    className="h-full w-full"
                    style={{
                        aspectRatio: prompt.aspectRatio.split(":").join("/"),
                    }}
                >
                    <Image
                        className="h-full w-full rounded-md"
                        src={url}
                        alt={title}
                        height={prompt.height / 3}
                        width={prompt.width / 3}
                        loading="lazy"
                        quality={60}
                    />
                </Link>
                <div className="flex items-end rounded-md md:absolute md:bottom-0 md:left-0">
                    <p className="-mb-2 inline-flex rounded-tr-lg bg-muted py-1 font-title text-sm tracking-wide md:-ml-1 md:mb-0 md:px-4">
                        {title}
                    </p>
                </div>
                <div className="absolute right-4 top-4">
                    {share && <PromptPopover {...prompt} />}
                </div>
            </div>
        </div>
    );
};
