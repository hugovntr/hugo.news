import { ImageGallery } from "@/components/gallery.server";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Me from "@/app/me.jpeg";
import { fetchImages } from "@hugo/notion";

export const metadata: Metadata = {
    title: "AI Gallery | Hugo Ventura.",
};

export const revalidate = 120;

export default async function Page() {
    const data = await fetchImages({ page_size: 50 });
    return (
        <div>
            <div className="container">
                <Link href="/">
                    <Image
                        src={Me}
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
                <ImageGallery images={data.images} />
            </div>
        </div>
    );
}
