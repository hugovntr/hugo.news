import {
    ButtonBuilder,
    ButtonStyle,
    ComponentType,
    InteractionReplyOptions,
    ModalComponentData,
    StringSelectMenuBuilder,
    StringSelectMenuOptionBuilder,
    TextInputBuilder,
} from "discord.js";
import { fetchCollections, NotionPushImageData } from "@hugo/notion";

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
    final: (pageId: string, data: NotionPushImageData) => ({
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

export async function getCollectionsFromNotion() {
    const collections = await fetchCollections();
    return collections.map((c) => ({
        id: c.id,
        name: c.properties.Name.title.find((v) => v.plain_text)?.plain_text,
    }));
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
