import Link from "next/link";
import Image from "next/image";
import Me from "@/app/me.jpeg";
import { getImage, getImageInfos } from "@/lib/images";
import { PromptPopoverContent } from "@/app/prompt.client";
import { Copyright } from "@/components/copyright";
import { cn } from "@/lib/utils";
import { Metadata } from "next";
import { createHmac } from "node:crypto";
import { notFound } from "next/navigation";
import type { OGPayload } from "@/app/api/og/route";
import { ImageCollections } from "@/components/collections.server";

interface PageProps {
    params: {
        id: string;
    };
}

function getToken(data: string): string {
    const hmac = createHmac("sha256", process.env.ENCRYPT_KEY ?? "");
    hmac.update(data);
    return hmac.digest("hex");
}

export const revalidate = 120;

export async function generateMetadata({
    params,
}: PageProps): Promise<Metadata> {
    const { properties, id } = await getImage(params.id);
    const infos = getImageInfos(properties);
    if (!infos) notFound();

    const payload: OGPayload = {
        title: infos.title,
        url: infos.url,
        withPrompt: infos.share,
    };

    const base64data = Buffer.from(JSON.stringify(payload)).toString("base64");

    const token = getToken(base64data);

    return {
        title: `${infos?.title} | Hugo Ventura.`,
        authors: {
            url: "https://hugo.news",
            name: "Hugo Ventura",
        },
        openGraph: {
            images: [{ url: `/api/og?data=${base64data}&token=${token}` }],
            url: `/gallery/images/${id}`,
        },
        twitter: {
            card: "summary_large_image",
            title: `${infos?.title} | Hugo Ventura.`,
            images: [{ url: `/api/og?data=${base64data}&token=${token}` }],
        },
    };
}

export default async function Page({ params }: PageProps) {
    const { properties } = await getImage(params.id);
    const infos = getImageInfos(properties);
    if (!infos) return null;
    const { prompt, share, title, url, collectionIds } = infos;

    const isPortrait = prompt.width < prompt.height;
    const aspectRatio = prompt.aspectRatio.split(":").join("/");

    return (
        <div>
            <div className="container my-4">
                <Link href="/">
                    <Image
                        src={Me}
                        className="mx-auto h-12 w-12 rounded-full bg-muted object-cover"
                        alt="Hugo Ventura"
                    />
                </Link>
            </div>
            <div className="container">
                <div
                    className={cn("flex flex-1 flex-col gap-4", {
                        "lg:flex-row lg:justify-between": isPortrait,
                    })}
                >
                    <figure
                        className="relative flex max-h-screen overflow-hidden rounded-3xl bg-muted/80 p-2 dark:bg-muted/50"
                        style={{
                            aspectRatio,
                            height: prompt.height,
                            width: "auto",
                        }}
                    >
                        <Image
                            src={url}
                            alt={title}
                            height={prompt.height}
                            width={prompt.width}
                            className="relative max-h-screen w-auto rounded-2xl bg-muted object-cover"
                            placeholder="empty"
                            style={{ aspectRatio }}
                        />
                    </figure>
                    <div>
                        <div className="sticky top-8 flex max-w-sm flex-col gap-4">
                            <h1 className="mb-2 font-title text-3xl font-semibold">
                                {title}
                            </h1>
                            <ImageCollections ids={collectionIds} />
                            {share && <PromptPopoverContent {...prompt} />}
                            <Copyright className="mt-8" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
