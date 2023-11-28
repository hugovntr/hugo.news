import Link from "next/link";
import Image from "next/image";
import { ImageGalleryFallback } from "@/components/gallery.server";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <>
            <div className="container mb-24 max-w-xl">
                <Skeleton className="mb-2 h-8 w-96" />
            </div>
            <div className="container">
                <ImageGalleryFallback />
            </div>
        </>
    );
}
