import { FC } from "react";
import { getImageUrl, ImageDatabaseItem } from "@/lib/images";
import { parsePrompt } from "@/lib/prompt";
import Image from "next/image";
import { PromptPopover, PromptPopoverContent } from "@/app/prompt.client";
import { Masonry } from "@/components/masonry";
import { ImageZoomable } from "@/components/gallery.client";
import { Copyright } from "@/components/copyright";

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
    const imageUrl = getImageUrl(properties.Image);
    const title = properties.Name.title.find((t) => t.plain_text);
    const promptRaw = properties.Prompt.rich_text.find((t) => t.plain_text);
    const promptShare = properties.PromptShare.checkbox;

    if (!imageUrl || !promptRaw) return null;
    const prompt = parsePrompt(promptRaw.plain_text);
    return (
        <div>
            <div className="relative flex overflow-hidden rounded-lg bg-muted/80 p-2 dark:bg-muted/50">
                <ImageZoomable
                    src={imageUrl}
                    height={prompt.height}
                    width={prompt.width}
                    alt={title?.plain_text ?? ""}
                >
                    <p className="mb-2 font-title text-lg font-semibold">
                        {title?.plain_text ?? ""}
                    </p>
                    {promptShare && <PromptPopoverContent {...prompt} />}
                    <Copyright className="mt-auto" />
                </ImageZoomable>
                <div className="absolute bottom-0 left-0 flex items-end rounded-md">
                    <p className="-ml-1 inline-flex rounded-tr-lg bg-muted px-4 py-1 font-title text-sm font-semibold tracking-wide">
                        {title?.plain_text}
                    </p>
                </div>
                <div className="absolute right-4 top-4">
                    {promptShare && <PromptPopover {...prompt} />}
                </div>
            </div>
        </div>
    );
};
