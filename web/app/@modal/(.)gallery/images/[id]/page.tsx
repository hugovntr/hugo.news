import { getImageInfos } from "@/lib/images";
import Image from "next/image";
import { PromptPopoverContent } from "@/app/prompt.client";
import { Copyright } from "@/components/copyright";
import { Modal, ModalClose } from "./modal";
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
        <Modal>
            <Suspense fallback={<Fallback />}>
                <Content id={params.id} />
            </Suspense>
        </Modal>
    );
    // return (
    //     <Dialog>
    //         <DialogContent className="flex h-fit max-h-screen w-fit gap-0 overflow-hidden p-0 md:max-h-[calc(100vh_-_2rem)] md:w-max md:max-w-[calc(100vw_-_2rem)]">
    //             <Suspense fallback={<Fallback />}>
    //                 <Data id={params.id} />
    //             </Suspense>
    //         </DialogContent>
    //     </Dialog>
    // );
}

const Content: FC<{ id: string }> = async ({ id }) => {
    const image = await fetchImage(id);
    const infos = getImageInfos(image.properties);
    if (!infos) return null;
    const { prompt, share, title, url, collectionIds } = infos;

    return (
        <div className="bg-background border-border/60 relative flex max-h-full max-w-full flex-col overflow-auto overscroll-none rounded-t-2xl border shadow-2xl md:flex-row md:rounded-xl">
            <figure
                className="bg-muted h-full w-full flex-shrink  md:max-h-[calc(-4rem+100vh)]"
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
            </figure>
            <div className="border-border flex w-full flex-shrink flex-col gap-4 p-4 md:max-w-xs md:border-l">
                <div className="mb-2 flex flex-row items-start justify-between gap-2">
                    <p className="font-title mt-1 text-lg font-semibold">
                        {title}
                    </p>
                    <ModalClose />
                </div>
                <div className="flex flex-shrink flex-col gap-4 md:overflow-auto">
                    <CollectionsBadges ids={collectionIds} />
                    {share && <PromptPopoverContent {...prompt} />}
                </div>
                <Copyright className="mt-auto" />
            </div>
        </div>
    );
};

const Fallback: FC = () => (
    <div className="bg-background border-border/60 relative flex max-h-full max-w-full flex-col overflow-auto rounded-xl border shadow-2xl md:flex-row">
        <div className="overflow-hidden" style={{ aspectRatio: 2 / 3 }}>
            <Skeleton style={{ width: 896, height: 1344 }} />
        </div>
        <div className="border-border hidden w-full max-w-xs gap-4 border-l p-4 pt-12 lg:flex lg:flex-col">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="mt-auto h-4 w-2/3" />
        </div>
    </div>
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
