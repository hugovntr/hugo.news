import { FC } from "react";
import { getCollectionInfos } from "@/lib/images";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    fetchCollections,
    NotionImageCollectionDatabaseItem,
} from "@hugo/notion";

export const ImageCollections: FC<{ ids: string[] }> = async (props) => {
    const { ids } = props;
    const collections = await fetchCollections(ids);
    if (collections.length === 0) return null;
    return (
        <div className="flex flex-wrap gap-2">
            {collections.map((c) => (
                <CollectionItem {...c} key={c.id} />
            ))}
        </div>
    );
};

const CollectionItem: FC<NotionImageCollectionDatabaseItem> = (props) => {
    const { properties } = props;
    const infos = getCollectionInfos(properties);
    if (!infos) return;
    return (
        <Button asChild variant="outline" size="badge">
            <Link href={`/gallery/collections/${props.id}`}>
                <p>{infos.title}</p>
            </Link>
        </Button>
    );
};
