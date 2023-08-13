import { getImage, getImageInfos } from "@/lib/images";
import Image from "next/image";
import { PromptPopoverContent } from "@/app/prompt.client";
import { Copyright } from "@/components/copyright";
import { Dialog, DialogContent } from "./modal";
import { ImageCollections } from "@/components/collections.server";
import { FC, Suspense } from "react";
import { FormData } from "next/dist/compiled/@edge-runtime/primitives";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface PageProps {
    params: {
        id: string;
    };
}

export const revalidate = 120;

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
        <div className="hidden w-full max-w-xs gap-4 border-l border-border p-4 pt-12 lg:flex lg:flex-col">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="mt-auto h-4 w-2/3" />
        </div>
    </>
);

const Data: FC<{ id: string }> = async ({ id }) => {
    const { properties } = await getImage(id);
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
            <Image
                className={cn("", {
                    "w-max md:h-full md:max-h-screen md:w-full md:flex-shrink":
                        isPortrait,
                    "md:max-w-auto h-full max-w-[100vw] flex-1 md:w-full":
                        !isPortrait,
                })}
                style={{
                    aspectRatio: prompt.aspectRatio.split(":").join("/"),
                }}
                loading="eager"
                src={url}
                alt={title}
                height={prompt.height}
                width={prompt.width}
                quality={100}
            />
            <div className="flex w-full flex-shrink-0 flex-col gap-4 border-border p-4 md:max-w-xs md:border-l md:pt-12">
                <p className="mb-2 font-title text-lg font-semibold">{title}</p>
                <ImageCollections ids={collectionIds} />
                {share && <PromptPopoverContent {...prompt} />}
                <Copyright className="mt-auto" />
            </div>
        </div>
    );
};
