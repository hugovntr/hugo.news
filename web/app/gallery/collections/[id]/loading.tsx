import Link from "next/link";
import Image from "next/image";
import { ImageGalleryFallback } from "@/components/gallery.server";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div>
            <div className="container my-4">
                <Link href="/">
                    <Image
                        src={"https://avatars.githubusercontent.com/hugovntr"}
                        height={96}
                        width={96}
                        className="bg-muted mx-auto h-12 w-12 rounded-full object-cover"
                        alt="Hugo Ventura"
                    />
                </Link>
            </div>
            <div className="container max-w-xl py-24">
                <Skeleton className="mb-2 h-8 w-96" />
            </div>
            <div className="container">
                <ImageGalleryFallback />
            </div>
        </div>
    );
}
