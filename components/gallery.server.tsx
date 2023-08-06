import { FC } from "react";
import { getImageInfos, ImageDatabaseItem } from "@/lib/images";
import { PromptPopover } from "@/app/prompt.client";
import { Masonry } from "@/components/masonry";
import Link from "next/link";
import Image from "next/image";

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

const ImageWrapper: FC<ImageDatabaseItem> = (props) => {
    const { properties } = props;
    const infos = getImageInfos(properties);
    if (!infos) return null;
    const { prompt, share, title, url } = infos;

    return (
        <div>
            <div className="relative flex overflow-hidden rounded-lg bg-muted/80 p-2 dark:bg-muted/50">
                <Link
                    href={`/gallery/images/${props.id}`}
                    className="max-h-screen"
                    style={{
                        aspectRatio: prompt.aspectRatio.split(":").join("/"),
                    }}
                >
                    <Image
                        src={url}
                        alt={title}
                        height={prompt.height}
                        width={prompt.width}
                        unoptimized
                    />
                </Link>
                <div className="absolute bottom-0 left-0 flex items-end rounded-md">
                    <p className="-ml-1 inline-flex rounded-tr-lg bg-muted px-4 py-1 font-title text-sm font-semibold tracking-wide">
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
