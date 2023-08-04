import { getImages } from "@/lib/images";
import { ImageGallery } from "@/components/gallery.server";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
    title: "AI Gallery | Hugo Ventura.",
};

export const revalidate = 120;

export default async function Page() {
    const data = await getImages({ page_size: 50 });
    return (
        <div>
            <div className="container max-w-xl py-24">
                <h1 className="mb-2 font-title text-2xl font-semibold">
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
                <ImageGallery images={data.images} />
            </div>
        </div>
    );
}
