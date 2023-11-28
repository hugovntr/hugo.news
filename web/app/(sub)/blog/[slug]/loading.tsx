import { CorpusSkeleton, Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="container max-w-prose">
            <Skeleton className="mb-16 h-10 w-full" />
            <Skeleton className="mb-16 h-4 w-1/2" />
            <hr />

            <Skeleton className="mb-8 mt-16 h-8 w-32" />
            <CorpusSkeleton lines={6} />
            <Skeleton className="mb-8 mt-16 h-8 w-32" />
            <CorpusSkeleton lines={8} />
            <Skeleton className="mb-8 mt-16 h-8 w-32" />
            <CorpusSkeleton lines={4} />
        </div>
    );
}
