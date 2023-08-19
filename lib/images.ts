import { QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";
import { Client } from "@notionhq/client";
import { parsePrompt } from "@/lib/prompt";

type QueryResult = Extract<
    QueryDatabaseResponse["results"][number],
    { properties: Record<string, unknown> }
>;
type PropertyValueMap = QueryResult["properties"];
type PropertyValue = PropertyValueMap[string];
type PropertyValueType = PropertyValue["type"];
type ExtractedPropertyValue<T extends PropertyValueType> = Extract<
    PropertyValue,
    { type: T }
>;

export type ImageDatabaseItem = QueryResult & {
    properties: {
        Name: ExtractedPropertyValue<"title">;
        Image: ExtractedPropertyValue<"files">;
        Prompt: ExtractedPropertyValue<"rich_text">;
        PromptShare: ExtractedPropertyValue<"checkbox">;
        Collections: ExtractedPropertyValue<"relation">;
    };
};

export type ImageCollectionDatabaseItem = QueryResult & {
    properties: {
        Name: ExtractedPropertyValue<"title">;
    };
};

interface GetImagesOptions {
    page_size?: number;
}

export const getImages = async (
    options?: GetImagesOptions
): Promise<{
    images: ImageDatabaseItem[];
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
    return { images: db.results as ImageDatabaseItem[], more: db.has_more };
};

export const getImage = async (id: string) => {
    const client = new Client({ auth: process.env.NOTION_TOKEN });
    const page = await client.pages.retrieve({ page_id: id });
    return page as ImageDatabaseItem;
};

export const getImageUrl = (
    data: ImageDatabaseItem["properties"]["Image"]
): string | undefined => {
    const file = data.files.find((i) => i.type !== undefined);
    if (!file || !file.type) return;
    switch (file.type) {
        case "external":
            return file.external.url;
        case "file":
            return file.file.url;
        default:
            return;
    }
};

export const getImageInfos = (properties: ImageDatabaseItem["properties"]) => {
    const url = getImageUrl(properties.Image);
    const promptRaw = properties.Prompt.rich_text.find((t) => t.plain_text);
    if (!url || !promptRaw) {
        return;
    }
    return {
        url: url,
        title:
            properties.Name.title.find((t) => t.plain_text)?.plain_text ?? "",
        prompt: parsePrompt(promptRaw?.plain_text ?? ""),
        share: properties.PromptShare.checkbox as boolean,
        collectionIds: (
            properties.Collections.relation as { id: string }[]
        ).flatMap((i) => i?.id),
    };
};

export const getCollections = async (
    ids: string[]
): Promise<ImageCollectionDatabaseItem[]> => {
    const client = new Client({ auth: process.env.NOTION_TOKEN });
    const db = await client.databases.query({
        database_id: process.env.NOTION_COLLECTIONS_DATABASE ?? "",
    });

    return db.results.filter((item) =>
        ids.includes(item.id)
    ) as ImageCollectionDatabaseItem[];
};

export const getCollection = async (id: string) => {
    const client = new Client({ auth: process.env.NOTION_TOKEN });
    const page = await client.pages.retrieve({ page_id: id });
    return page as ImageCollectionDatabaseItem;
};

export const getCollectionInfos = (
    properties: ImageCollectionDatabaseItem["properties"]
) => {
    const title = properties.Name.title.find((t) => t.plain_text)?.plain_text;

    if (!title) return;

    return {
        title,
    };
};

export const getCollectionImages = async (id: string) => {
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
        images: pages.results as ImageDatabaseItem[],
        more: pages.has_more,
    };
};
