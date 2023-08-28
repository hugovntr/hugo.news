import { Client } from "@notionhq/client";
import {
    NotionImageCollectionDatabaseItem,
    NotionImageDatabaseItem,
} from "./types";
import type { QueryDatabaseParameters } from "@notionhq/client/build/src/api-endpoints";

interface GetImagesOptions
    extends Omit<QueryDatabaseParameters, "database_id"> {}

export const fetchImages = async (
    options?: GetImagesOptions
): Promise<{
    images: NotionImageDatabaseItem[];
    more: boolean;
}> => {
    const client = new Client({ auth: process.env.NOTION_TOKEN });
    const opts: GetImagesOptions = {
        page_size: 12,
        ...options,
    };
    const db = await client.databases.query({
        database_id: process.env.NOTION_IMAGES_DATABASE ?? "",
        sorts: [{ property: "CreatedAt", direction: "descending" }],
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
        sorts: [{ property: "UpdatedAt", direction: "descending" }],
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
        sorts: [{ property: "CreatedAt", direction: "descending" }],
    });
    return {
        images: pages.results as NotionImageDatabaseItem[],
        more: pages.has_more,
    };
};

export type RichText = {
    type: string;
    text: { content: string; link: string | null };
    annotations: {
        bold: boolean;
        italic: boolean;
        strikethrough: boolean;
        underline: boolean;
        code: boolean;
        color: string;
    };
    plain_text: string;
    href: string | null;
};

const BlockType = [
    "paragraph",
    "heading_1",
    "heading_2",
    "heading_3",
    "bulleted_list_item",
    "numbered_list_item",
    "image",
] as const;

type TextBlock = Exclude<(typeof BlockType)[number], "image">;
type ImageBlock = "image";

export type Block = {
    object: "block";
    id: string;
    parent: {
        type: "page_id";
        page_id: "string";
    };
    type: TextBlock | ImageBlock;
} & {
    [p in TextBlock | ImageBlock]: {
        color: string;
        rich_text: RichText[];
        file: { url: string };
    };
};

export const fetchBlocks = async (id: string) => {
    const client = new Client({ auth: process.env.NOTION_TOKEN });
    const { results } = await client.blocks.children.list({
        block_id: id,
        page_size: 50,
    });
    return results as Block[];
};
