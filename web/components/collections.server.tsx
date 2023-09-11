import { cache, FC, Suspense } from "react";
import { getCollectionInfos, getImageInfos } from "@/lib/images";
import Link from "next/link";
import { Button, ButtonProps } from "@/components/ui/button";
import {
    fetchCollections,
    fetchImage,
    NotionImageCollectionDatabaseItem,
    NotionImageDatabaseItem,
} from "@hugo/notion";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { ImageClient } from "@/components/gallery.client";

export const CollectionsBadges: FC<{
    ids: string[];
    className?: string;
    variant?: ButtonProps["variant"];
}> = async (props) => {
    const { ids, className, variant } = props;
    const collections = await fetchCollections(ids);
    if (collections.length === 0) return null;
    return (
        <div className={cn("flex flex-wrap gap-2", className)}>
            {collections.map((c) => (
                <CollectionItem
                    {...c}
                    key={c.id}
                    variant={variant ?? "outline"}
                />
            ))}
        </div>
    );
};

const CollectionItem: FC<
    NotionImageCollectionDatabaseItem & { variant: ButtonProps["variant"] }
> = (props) => {
    const { properties, variant } = props;
    const infos = getCollectionInfos(properties);
    if (!infos) return;
    return (
        <Button asChild variant={variant} size="badge">
            <Link href={`/gallery/collections/${props.id}`}>
                <p>{infos.title}</p>
            </Link>
        </Button>
    );
};

export const ImageCollections: FC<{
    collections: NotionImageCollectionDatabaseItem[];
}> = async (props) => {
    const { collections } = props;
    return (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {collections.map((collection) => (
                <CollectionWrapper {...collection} key={collection.id} />
            ))}
        </div>
    );
};

export const ImageCollectionsFallback: FC = () => (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, index) => (
            <div key={index}>
                <Skeleton className="aspect-[4/3] rounded-md" />
                <div className="py-2">
                    <Skeleton className="mb-4 h-4 w-1/3" />
                    <Skeleton className="h-2 w-1/3" />
                </div>
            </div>
        ))}
    </div>
);

const CollectionWrapper: FC<NotionImageCollectionDatabaseItem> = async (
    props
) => {
    const { id, properties } = props;
    const { title, imagesIds } = getCollectionInfos(properties);

    const colImages: NotionImageDatabaseItem[] = [];
    for (const imageId of imagesIds.slice(0, 3)) {
        const c = cache(() => fetchImage(imageId));
        colImages.push(await c());
    }
    colImages.sort((a, b) => {
        return (
            new Date(b.properties.CreatedAt.created_time as string).getTime() -
            new Date(a.properties.CreatedAt.created_time as string).getTime()
        );
    });

    const updatedAt = Intl.DateTimeFormat("us", { dateStyle: "long" }).format(
        new Date(colImages[0].properties.CreatedAt.created_time as string)
    );

    return (
        <Link href={`/gallery/collections/${id}`} className="group">
            <div className="grid aspect-[4/3] grid-cols-3 grid-rows-2 overflow-hidden rounded-md transition-opacity group-hover:opacity-80">
                {colImages.map((image) => (
                    <CollectionImage
                        {...image}
                        gridSize={colImages.length}
                        key={image.id}
                    />
                ))}
            </div>
            <div className="py-4">
                <div className="mb-2 flex justify-between">
                    <p className="font-title text-lg font-semibold lg:text-xl">
                        {title}
                    </p>
                    <Badge variant="outline">{imagesIds.length} images</Badge>
                </div>
                <p className="text-muted-foreground text-sm">
                    Updated on <span className="font-medium">{updatedAt}</span>
                </p>
            </div>
        </Link>
    );
};

const CollectionImage: FC<NotionImageDatabaseItem & { gridSize: number }> = (
    props
) => {
    const { id, properties, gridSize } = props;
    const {
        url,
        title,
        prompt: { height, width },
    } = getImageInfos(properties);

    return (
        <div
            key={id}
            className={cn({
                "col-span-3 row-span-2": gridSize === 1,
                "row-span-2 first:col-span-2": gridSize === 2,
                "first:col-span-2 first:row-span-2": gridSize === 3,
            })}
        >
            <ImageClient
                className="bg-muted h-full w-full object-cover object-center"
                src={url}
                alt={title}
                height={height / 3}
                width={width / 3}
                loading="lazy"
                placeholder="empty"
                quality={75}
            />
        </div>
    );
};
