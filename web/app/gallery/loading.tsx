import Link from "next/link";
import Image from "next/image";
import { ImageGalleryFallback } from "@/components/gallery.server";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div>
            <div className="container">
                <Link href="/">
                    <Image
                        src={"https://avatars.githubusercontent.com/hugovntr"}
                        height={96}
                        width={96}
                        className="bg-muted mx-auto mt-4 h-12 w-12 rounded-full object-cover"
                        alt="Hugo Ventura"
                    />
                </Link>
            </div>
            <div className="container max-w-xl py-24">
                <h1 className="font-title mb-2 text-2xl font-semibold">
                    AI Gallery
                </h1>
                <p>
                    In 2022 I stumbled upon a post on X (prev. Twitter) about{" "}
                    <Link href="https://midjourney.com" className="link">
                        Midjourney
                    </Link>
                </p>
                <p>
                    Since then, I&apos;ve playing and experimenting with all
                    kinds of Generative AI.
                </p>
            </div>
            <div className="container">
                <ImageGalleryFallback />
            </div>
        </div>
    );
}
