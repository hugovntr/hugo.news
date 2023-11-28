import { cn } from "@/lib/utils";
import { type HTMLAttributes } from "react";

function Skeleton({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn("bg-muted animate-pulse rounded-md", className)}
            {...props}
        />
    );
}

function CorpusSkeleton({
    className,
    lines,
    ...props
}: HTMLAttributes<HTMLDivElement> & { lines: number }) {
    return (
        <div className="flex w-full flex-col gap-4">
            {Array(lines)
                .fill(1)
                .map((_, key) => {
                    const width = Math.floor(
                        Math.random() * (100 - 50 + 1) + 50
                    );
                    return (
                        <Skeleton
                            key={`corpus-skeleton-${key}`}
                            className={cn("h-4", className)}
                            style={{ width: `${width}%` }}
                            {...props}
                        />
                    );
                })}
        </div>
    );
}

export { Skeleton, CorpusSkeleton };
