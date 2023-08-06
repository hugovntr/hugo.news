import { QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";
import { Client } from "@notionhq/client";
import { parsePrompt } from "@/lib/prompt";

type ImageResult = Extract<
    QueryDatabaseResponse["results"][number],
    { properties: Record<string, unknown> }
>;
type PropertyValueMap = ImageResult["properties"];
type PropertyValue = PropertyValueMap[string];
type PropertyValueType = PropertyValue["type"];
type ExtractedPropertyValue<T extends PropertyValueType> = Extract<
    PropertyValue,
    { type: T }
>;

export type ImageDatabaseItem = ImageResult & {
    properties: {
        Name: ExtractedPropertyValue<"title">;
        Image: ExtractedPropertyValue<"files">;
        Prompt: ExtractedPropertyValue<"rich_text">;
        PromptShare: ExtractedPropertyValue<"checkbox">;
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
        page_size: 3,
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
    };
};
