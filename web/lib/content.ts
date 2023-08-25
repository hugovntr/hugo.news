import { Client } from "@notionhq/client";

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

export const getBlocks = async (id: string) => {
    const client = new Client({ auth: process.env.NOTION_TOKEN });
    const { results } = await client.blocks.children.list({
        block_id: id,
        page_size: 50,
    });
    return results as Block[];
};
