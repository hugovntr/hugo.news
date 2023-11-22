import { Command } from "@/commands/types";
import { ApplicationCommandType, ContextMenuCommandBuilder } from "discord.js";

const commands: Command[] = [
    {
        command: new ContextMenuCommandBuilder()
            .setName("Enhance")
            .setType(ApplicationCommandType.Message),
        handler: async (interaction) => {
            await interaction.reply(
                `Image enhancement requested by ${interaction.user} — Processing`
            );
            try {
                const response = await fetch("http://localhost:1234");
                if (!response.ok) throw new Error();
                await interaction.editReply({
                    content: `Image enhanced — ${interaction.user}`,
                    files: [
                        {
                            name: "test.jpg",
                            attachment: Buffer.from(
                                await response.arrayBuffer()
                            ),
                        },
                    ],
                });
            } catch {
                await interaction.editReply({
                    content: "Error while enhancing your image",
                });
            }
        },
    } satisfies Command<ContextMenuCommandBuilder>,
];

export default commands;
