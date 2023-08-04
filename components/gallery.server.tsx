import { FC } from "react";
import { getImageUrl, ImageDatabaseItem } from "@/lib/images";
import { parsePrompt } from "@/lib/prompt";
import Image from "next/image";
import { PromptPopover } from "@/app/prompt.client";
import { Masonry } from "@/components/masonry";

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
            <div className="relative overflow-hidden rounded-lg bg-muted/80 p-2 dark:bg-muted/50">
                <Image
                    src={imageUrl}
                    width={prompt.width}
                    height={prompt.height}
                    unoptimized={true}
                    className="rounded-md border border-border"
                    alt={title?.plain_text ?? ""}
                />
                <div className="absolute inset-0 flex items-end rounded-md">
                    <p className="-ml-1 inline-flex rounded-tr-lg bg-muted px-4 py-1 font-title text-sm font-semibold tracking-wide">
                        {title?.plain_text}
                    </p>
                    {promptShare && <PromptPopover {...prompt} />}
                </div>
            </div>
        </div>
    );
};
