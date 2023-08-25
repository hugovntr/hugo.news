import { Client } from "@notionhq/client";
import {
    NotionImageCollectionDatabaseItem,
    NotionImageDatabaseItem,
} from "./types";

interface GetImagesOptions {
    page_size?: number;
}

export const fetchImages = async (
    options?: GetImagesOptions
): Promise<{
    images: NotionImageDatabaseItem[];
    more: boolean;
}> => {
    const client = new Client({ auth: process.env.NOTION_TOKEN });
    const opts: Required<GetImagesOptions> = {
        page_size: 12,
        ...options,
    };
    const db = await client.databases.query({
        database_id: process.env.NOTION_IMAGES_DATABASE ?? "",
        ...opts,
    });
    return {
        images: db.results as NotionImageDatabaseItem[],
        more: db.has_more,
    };
};

export const fetchImage = async (id: string) => {
    const client = new Client({ auth: process.env.NOTION_TOKEN });
    const page = await client.pages.retrieve({ page_id: id });
    return page as NotionImageDatabaseItem;
};

export const fetchCollections = async (
    ids?: string[]
): Promise<NotionImageCollectionDatabaseItem[]> => {
    const client = new Client({ auth: process.env.NOTION_TOKEN });
    const db = await client.databases.query({
        database_id: process.env.NOTION_COLLECTIONS_DATABASE ?? "",
    });

    return ids
        ? (db.results.filter((item) =>
              ids.includes(item.id)
          ) as NotionImageCollectionDatabaseItem[])
        : (db.results as NotionImageCollectionDatabaseItem[]);
};

export const fetchCollection = async (id: string) => {
    const client = new Client({ auth: process.env.NOTION_TOKEN });
    const page = await client.pages.retrieve({ page_id: id });
    return page as NotionImageCollectionDatabaseItem;
};

export const fetchCollectionImages = async (id: string) => {
    const client = new Client({ auth: process.env.NOTION_TOKEN });
    const pages = await client.databases.query({
        database_id: process.env.NOTION_IMAGES_DATABASE ?? "",
        filter: {
            property: "Collections",
            relation: {
                contains: id,
            },
        },
    });
    return {
        images: pages.results as NotionImageDatabaseItem[],
        more: pages.has_more,
    };
};
