import type { NextPage } from "next";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowUpRight, Github, Twitter } from "lucide-react";
import { ThemeSwitcher } from "@/components/theme";
import Me from "./me.jpeg";
import { getImages } from "@/lib/images";
import {
    ImageGallery,
    ImageGalleryFallback,
} from "@/components/gallery.server";
import { FC, Suspense } from "react";

export const revalidate = 120;

const Page: NextPage = async () => {
    return (
        <>
            <div className="container max-w-xl py-24">
                <Image
                    src={Me}
                    className="mb-8 h-20 w-20 rounded-full bg-muted object-cover shadow-2xl shadow-brand-200 dark:shadow-brand-950"
                    alt="Hugo Ventura"
                />
                <h1 className="mb-2 font-title text-2xl font-semibold">
                    Hello, I&apos;m Hugo
                </h1>
                <p>Software engineer & AI Researcher.</p>
                <p>Experimenting with Generative AI</p>
                <div className="mt-16 flex items-center justify-between">
                    <div className="grid grid-flow-col gap-2">
                        <Button asChild variant="outline" size="icon">
                            <Link href="https://x.com/hugovntr" target="_blank">
                                <Twitter className="h-4 w-4" />
                            </Link>
                        </Button>
                        <Button asChild variant="outline" size="icon">
                            <Link
                                href="https://github.com/hugovntr"
                                target="_blank"
                            >
                                <Github className="h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                    <ThemeSwitcher />
                </div>
            </div>
            <div className="container">
                <Suspense fallback={<ImageGalleryFallback />}>
                    <Gallery />
                </Suspense>
            </div>
        </>
    );
};

const Gallery: FC = async () => {
    const data = await getImages({ page_size: 25 });

    return (
        <>
            <ImageGallery images={data.images} />
            {data.more && (
                <div className="mb-16 mt-8 flex justify-center">
                    <Button asChild variant="ghost">
                        <Link href="/gallery/">
                            <span>View more</span>
                            <ArrowUpRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            )}
        </>
    );
};
export default Page;
