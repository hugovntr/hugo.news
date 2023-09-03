import { getImageInfos } from "@/lib/images";
import Image from "next/image";
import { PromptPopoverContent } from "@/app/prompt.client";
import { Copyright } from "@/components/copyright";
import { Dialog, DialogContent } from "./modal";
import { CollectionsBadges } from "@/components/collections.server";
import { FC, Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { fetchImage, fetchImages } from "@hugo/notion";

interface PageProps {
    params: {
        id: string;
    };
}

export const runtime = "edge";
export const revalidate = 120;

export async function generateStaticParams() {
    const { images } = await fetchImages();
    return images.reduce(
        (acc, cur) => [...acc, { id: cur.id }],
        [] as { id: string }[]
    );
}

export default async function Page({ params }: PageProps) {
    return (
        <Dialog>
            <DialogContent className="flex h-fit max-h-screen w-fit gap-0 overflow-hidden p-0 md:max-h-[calc(100vh_-_2rem)] md:w-max md:max-w-[calc(100vw_-_2rem)]">
                <Suspense fallback={<Fallback />}>
                    <Data id={params.id} />
                </Suspense>
            </DialogContent>
        </Dialog>
    );
}

const Fallback: FC = () => (
    <>
        <div className="overflow-hidden" style={{ aspectRatio: 2 / 3 }}>
            <Skeleton style={{ width: 896, height: 1344 }} />
        </div>
        <div className="border-border hidden w-full max-w-xs gap-4 border-l p-4 pt-12 lg:flex lg:flex-col">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="mt-auto h-4 w-2/3" />
        </div>
    </>
);

const Data: FC<{ id: string }> = async ({ id }) => {
    const { properties } = await fetchImage(id);
    const infos = getImageInfos(properties);
    if (!infos) return null;
    const { prompt, share, title, url, collectionIds } = infos;

    const isPortrait = prompt.width < prompt.height;

    return (
        <div
            className={cn("flex", {
                "max-h-screen w-[100vw] flex-col overflow-auto md:w-full md:flex-row md:overflow-hidden":
                    isPortrait,
                "h-fit max-h-screen w-full flex-col md:flex-row md:items-start":
                    !isPortrait,
            })}
        >
            <Suspense>
                <Image
                    className={cn("bg-muted", {
                        "w-max md:h-full md:max-h-screen md:w-full md:flex-shrink":
                            isPortrait,
                        "md:max-w-auto h-full max-w-[100vw] flex-1 md:w-full":
                            !isPortrait,
                    })}
                    style={{
                        aspectRatio: prompt.aspectRatio.split(":").join("/"),
                    }}
                    src={url}
                    alt={title}
                    height={prompt.height}
                    width={prompt.width}
                    placeholder="empty"
                    quality={100}
                    fetchPriority="high"
                />
            </Suspense>
            <div className="border-border flex w-full flex-shrink-0 flex-col gap-4 p-4 md:max-w-xs md:border-l md:pt-12">
                <p className="font-title mb-2 text-lg font-semibold">{title}</p>
                <CollectionsBadges ids={collectionIds} />
                {share && <PromptPopoverContent {...prompt} />}
                <Copyright className="mt-auto" />
            </div>
        </div>
    );
};
