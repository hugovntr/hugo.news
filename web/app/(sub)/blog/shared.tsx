import { Skeleton } from "@/components/ui/skeleton";
import { Masonry } from "@/components/masonry";

export const BlogHeader = () => {
    return (
        <div className="mx-auto mb-16 max-w-xl">
            <h2 className="font-title text-2xl font-semibold">Blog</h2>
            <p>
                Join me as I demystify <strong>Generative AI</strong>, dabble in{" "}
                <strong>Software engineering</strong>, and sprinkle in some{" "}
                <strong>lifestyle</strong> bits.
            </p>
        </div>
    );
};

export const BlogSkeleton = () => {
    const masonryProps = {
        className: "container flex gap-16",
        columnClassName: "flex flex-col gap-16",
        breakpointCols: { default: 3, 1024: 2, 768: 1 },
    };

    return (
        <Masonry {...masonryProps}>
            {Array(6)
                .fill(true)
                .map((_, key) => (
                    <div key={key}>
                        <Skeleton className="mb-4 h-6 w-full" />
                        <Skeleton className="mb-1 h-4 w-3/4" />
                        <Skeleton className="mb-6 h-4 w-2/3" />
                        <Skeleton className="mb-6 h-3 w-32" />
                    </div>
                ))}
        </Masonry>
    );
};
