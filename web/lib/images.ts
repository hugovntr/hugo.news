import { parsePrompt } from "@/lib/prompt";
import {
    NotionImageDatabaseItem,
    NotionImageCollectionDatabaseItem,
} from "@hugo/notion";

export const getImageUrl = (
    data: NotionImageDatabaseItem["properties"]["Image"]
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

export const getImageInfos = (
    properties: NotionImageDatabaseItem["properties"]
) => {
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
        createdAt: new Date(properties.CreatedAt.created_time as string),
    };
};

export const getCollectionInfos = (
    properties: NotionImageCollectionDatabaseItem["properties"]
) => {
    const title = properties.Name.title.find((t) => t.plain_text)?.plain_text;
    const imagesIds = (properties.Images.relation as { id: string }[]).reduce(
        (acc, cur) => [...acc, cur?.id],
        [] as string[]
    );

    if (!title || !imagesIds) return;

    return {
        title,
        imagesIds,
    };
};
