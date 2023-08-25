import { Client } from "@notionhq/client";

export interface NotionPushImageData {
    title: string;
    prompt: string;
    promptShare: boolean;
    image: string;
    collections: string[];
}

export const pushImage = async (data: NotionPushImageData): Promise<string> => {
    const client = new Client({ auth: process.env.NOTION_TOKEN });
    const page = await client.pages.create({
        parent: { database_id: process.env.NOTION_IMAGES_DATABASE! },
        properties: {
            Name: {
                type: "title",
                title: [{ text: { content: data.title } }],
            },
            Prompt: {
                rich_text: [{ text: { content: data.prompt } }],
            },
            PromptShare: {
                checkbox: data.promptShare,
            },
            Image: {
                files: [
                    {
                        name: data.title,
                        external: { url: data.image ?? "" },
                    },
                ],
            },
            Collections: {
                relation: data.collections.map((item) => ({ id: item })),
            },
        },
    });

    return page.id;
};
