import { getImage, getImageInfos } from "@/lib/images";
import Image from "next/image";
import { PromptPopoverContent } from "@/app/prompt.client";
import { Copyright } from "@/components/copyright";
import { Dialog, DialogContent } from "./modal";
import { ImageCollections } from "@/components/collections.server";
import { FC, Suspense } from "react";
import { FormData } from "next/dist/compiled/@edge-runtime/primitives";
import { Skeleton } from "@/components/ui/skeleton";

interface PageProps {
    params: {
        id: string;
    };
}

export const revalidate = 120;

export default async function Page({ params }: PageProps) {
    return (
        <Dialog>
            <DialogContent className="max-w-screen flex h-auto max-h-screen w-full gap-0 overflow-hidden p-0 md:max-h-[calc(100vh_-_2rem)] md:w-max md:max-w-[calc(100vw_-_2rem)]">
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

    return (
        <>
            <div
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
                />
            </div>
            <div className="hidden w-full max-w-xs gap-4 border-l border-border p-4 pt-12 lg:flex lg:flex-col">
                <p className="mb-2 font-title text-lg font-semibold">{title}</p>
                <ImageCollections ids={collectionIds} />
                {share && <PromptPopoverContent {...prompt} />}
                <Copyright className="mt-auto" />
            </div>
        </>
    );
};
