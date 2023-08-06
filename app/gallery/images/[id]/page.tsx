import Link from "next/link";
import Image from "next/image";
import Me from "@/app/me.jpeg";
import { getImage, getImageInfos } from "@/lib/images";
import { PromptPopoverContent } from "@/app/prompt.client";
import { Copyright } from "@/components/copyright";
import { cn } from "@/lib/utils";
import { Metadata } from "next";

interface PageProps {
    params: {
        id: string;
    };
}

export async function generateMetadata({
    params,
}: PageProps): Promise<Metadata> {
    const { properties } = await getImage(params.id);
    const infos = getImageInfos(properties);
    return {
        title: `${infos?.title} | Hugo Ventura.`,
        authors: {
            url: "https://hugo.news",
            name: "Hugo Ventura",
        },
    };
}

export default async function Page({ params }: PageProps) {
    const { properties } = await getImage(params.id);
    const infos = getImageInfos(properties);
    if (!infos) return null;
    const { prompt, share, title, url } = infos;

    const isPortrait = prompt.width < prompt.height;

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
                    <figure className="relative overflow-hidden rounded-3xl bg-muted/80 p-2 dark:bg-muted/50">
                        <Image
                            src={url}
                            alt={title}
                            height={prompt.height}
                            width={prompt.width}
                            className="relative max-h-screen w-auto rounded-2xl bg-muted"
                            placeholder="empty"
                            style={{
                                aspectRatio: prompt.aspectRatio
                                    .split(":")
                                    .join("/"),
                            }}
                            unoptimized
                        />
                    </figure>
                    <div>
                        <div className="sticky top-8 flex flex-col">
                            <h1 className="mb-2 font-title text-3xl font-semibold">
                                {title}
                            </h1>
                            {share && <PromptPopoverContent {...prompt} />}
                            <Copyright className="mt-8" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
