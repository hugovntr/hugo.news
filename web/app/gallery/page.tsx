import {
    ImageGallery,
    ImageGalleryFallback,
} from "@/components/gallery.server";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { fetchCollections, fetchImages } from "@hugo/notion";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import {
    ImageCollections,
    ImageCollectionsFallback,
} from "@/components/collections.server";
import { FC, Suspense } from "react";

export const metadata: Metadata = {
    title: "AI Gallery | Hugo Ventura.",
};

export const revalidate = 120;

export default async function Page() {
    return (
        <>
            <div className="container mb-32">
                <div className="mx-auto mb-16 max-w-xl">
                    <h2 className="font-title text-2xl font-semibold">
                        Images
                    </h2>
                    <p>
                        The latest images that I generated using{" "}
                        <Button
                            variant="link"
                            className="px-0 text-base"
                            asChild
                        >
                            <Link
                                href="https://midjourney.com/"
                                target="_blank"
                            >
                                Midjourney
                            </Link>
                        </Button>{" "}
                        and/or{" "}
                        <Button
                            variant="link"
                            className="px-0 text-base"
                            asChild
                        >
                            <Link
                                href="https://github.com/AUTOMATIC1111/stable-diffusion-webui"
                                target="_blank"
                            >
                                Stable Diffusion
                            </Link>
                        </Button>
                    </p>
                </div>
                <Suspense fallback={<ImageGalleryFallback />}>
                    <Gallery />
                </Suspense>
            </div>
            <div className="container">
                <div className="mx-auto mb-16 max-w-xl">
                    <h2 className="font-title text-2xl font-semibold">
                        Collections
                    </h2>
                    <p>
                        All the images that I generated are grouped into
                        multiple collections, depending on the theme or the
                        actual &quot;collection&quot; they represent
                    </p>
                </div>
                <Suspense fallback={<ImageCollectionsFallback />}>
                    <ImageCollections collections={await fetchCollections()} />
                </Suspense>
            </div>
        </>
    );
}

const Gallery: FC = async () => {
    const data = await fetchImages({ page_size: 5 });

    return (
        <>
            <ImageGallery images={data.images} />
            {data.more && (
                <div className="mt-8 flex justify-center">
                    <Button asChild variant="ghost">
                        <Link href={"/gallery/images"}>
                            <span>View more</span>
                            <ArrowUpRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            )}
        </>
    );
};
