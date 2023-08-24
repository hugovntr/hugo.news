import {
    ButtonBuilder,
    ButtonStyle,
    ComponentType,
    InteractionReplyOptions,
    ModalComponentData,
    StringSelectMenuBuilder,
    StringSelectMenuOptionBuilder,
    TextInputBuilder,
    UserSelectMenuBuilder,
} from "discord.js";
import { Client } from "@notionhq/client";
import { ImageCollectionDatabaseItem } from "@/lib/images";

export const replies: Record<
    string,
    (...data: any) => InteractionReplyOptions
> = {
    modal: (title: string) => ({
        fetchReply: true,
        ephemeral: true,
        content: `Would you like to share the prompt for **${title}**`,
        components: [
            {
                type: ComponentType.ActionRow,
                components: [
                    new ButtonBuilder()
                        .setCustomId("promptShare_true")
                        .setLabel("Yes")
                        .setStyle(ButtonStyle.Success),
                    new ButtonBuilder()
                        .setCustomId("promptShare_false")
                        .setLabel("No")
                        .setStyle(ButtonStyle.Secondary),
                ],
            },
        ],
    }),
    collections: (
        title: string,
        data: { id: string; name: string | undefined }[]
    ) => ({
        content: `Select the collection for **${title}**`,
        components: [
            {
                type: ComponentType.ActionRow,
                components: [
                    new StringSelectMenuBuilder()
                        .setCustomId("collections")
                        .setPlaceholder("Collections")
                        .addOptions(
                            data
                                .filter((item) => item.name)
                                .map((item) =>
                                    new StringSelectMenuOptionBuilder()
                                        .setLabel(item.name!)
                                        .setValue(item.id)
                                )
                        ),
                ],
            },
        ],
    }),
    final: (pageId: string, data: NotionPushData) => ({
        content: `**${data.title}** published to https://hugo.news`,
        embeds: [
            {
                title: data.title,
                fields: [
                    { name: "Prompt", value: data.prompt },
                    {
                        name: "Public prompt",
                        value: data.promptShare ? "Yes" : "No",
                        inline: true,
                    },
                    {
                        name: "Public URL",
                        value: `https://hugo.news/gallery/images/${pageId}`,
                        inline: true,
                    },
                ],
            },
        ],
        components: [],
    }),
};

export const modalContent: (prompt: string) => ModalComponentData = (
    prompt
) => ({
    customId: "publish",
    title: "Publish",
    components: [
        {
            type: ComponentType.ActionRow,
            components: [
                new TextInputBuilder()
                    .setCustomId("titleInput")
                    .setLabel("Title")
                    .setStyle(1),
            ],
        },
        {
            type: ComponentType.ActionRow,
            components: [
                new TextInputBuilder()
                    .setCustomId("promptInput")
                    .setLabel("Prompt")
                    .setStyle(2)
                    .setValue(prompt),
            ],
        },
    ],
});

export interface NotionPushData {
    title: string;
    prompt: string;
    promptShare: boolean;
    image: string;
    collections: string[];
}
export async function pushImageToNotion(data: NotionPushData) {
    // noinspection JSUnresolvedReference
    const notion = new Client({ auth: process.env.NOTION_TOKEN });
    // noinspection JSUnresolvedReference
    const page = await notion.pages.create({
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
}

export async function getCollectionsFromNotion() {
    // noinspection JSUnresolvedReference
    const notion = new Client({ auth: process.env.NOTION_TOKEN });
    try {
        // noinspection JSUnresolvedReference
        const { results } = await notion.databases.query({
            database_id: process.env.NOTION_COLLECTIONS_DATABASE!,
        });
        return (results as ImageCollectionDatabaseItem[]).map((r) => ({
            id: r.id,
            name: r.properties.Name.title.find((v) => v.plain_text)?.plain_text,
        }));
    } catch {
        // noinspection JSUnresolvedReference
        throw new Error(
            `Could not retrieve collections from your Notion database with ID ${process.env.NOTION_COLLECTIONS_DATABASE}`
        );
    }
}

interface GenerationData {
    prompt: string;
    type: "UPSCALE" | "VARIATION";
}

export function dataFromMessageContent(content: string): GenerationData | null {
    const [prompt, maybeType] = content.split("**").filter(Boolean);
    if (!maybeType) return null;
    // TODO: Sometimes there is not "Image" or "Variations" before the `maybeType`.
    //  So use the `(fast/relax/turbo)` as a token
    //  Or use the author id (MJ bot should have a unique ID)
    let type = maybeType.replace("-", "").trim().split(" ").shift()?.trim();
    switch (type) {
        case "Image":
            type = "UPSCALE";
            break;
        case "Variations":
            type = "VARIATION";
            break;
        default:
            return null;
    }
    return {
        prompt,
        type: type as GenerationData["type"],
    };
}
