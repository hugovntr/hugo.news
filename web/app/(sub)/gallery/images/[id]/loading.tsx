import Link from "next/link";
import Image from "next/image";
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
            <div className="container">
                <div className="flex flex-col gap-4 lg:flex-row lg:justify-between">
                    <Skeleton
                        className="max-h-screen rounded-2xl"
                        style={{
                            aspectRatio: 2 / 3,
                            height: 1344,
                            width: "auto",
                        }}
                    />
                    <div className="flex w-full max-w-sm flex-col gap-4">
                        <Skeleton className="h-8 w-full" />
                        <div className="flex flex-wrap gap-3">
                            <Skeleton className="h-6 w-16 rounded-full" />
                            <Skeleton className="h-6 w-16 rounded-full" />
                        </div>
                        <Skeleton className="h-4 w-2/3" />
                    </div>
                </div>
            </div>
        </div>
    );
}
