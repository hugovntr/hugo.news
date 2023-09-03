import { Command } from "@/commands/types";
import {
    Attachment,
    ChatInputCommandInteraction,
    SlashCommandBuilder,
} from "discord.js";
import ffmpeg from "fluent-ffmpeg";
import MemoryStream from "memorystream";
import ffmpegPath from "ffmpeg-static";
import { randomUUID } from "crypto";
import fs from "fs";

const commands: Command[] = [
    {
        command: new SlashCommandBuilder()
            .setName("fps")
            .setDescription(
                "Change the frames per seconds of a generated video"
            )
            .addAttachmentOption((option) =>
                option
                    .setName("video")
                    .setRequired(true)
                    .setDescription("The video")
            )
            .addNumberOption((option) =>
                option
                    .setName("fps")
                    .setDescription("Desired fps (must be a number)")
                    .setRequired(true)
            ),
        handler: async (interaction) => {
            const target = interaction.options.getAttachment("video");
            const fps = interaction.options.getNumber("fps");
            if (!target) {
                await interaction.reply("No video provided");
                return;
            }
            if (!fps) {
                await interaction.reply(
                    "No FPS provided or invalid format\n_> Usage: fps:60_"
                );
                return;
            }
            console.log(`Received attachement with type ${target.contentType}`);
            if (!target.contentType?.startsWith("video/")) {
                await interaction.reply({
                    content:
                        `The file **${target.name}** is not a video file\n` +
                        `\`\`\`${target.contentType}\`\`\``,
                    ephemeral: true,
                });
                return;
            }
            const name = randomUUID();

            try {
                await frameRate(interaction, target, fps, name);
            } catch (e) {
                await interaction.reply({
                    content:
                        "Error while converting your video\n```" + e + "```",
                    ephemeral: true,
                });
            }
        },
    } as Command<SlashCommandBuilder>,
];

async function frameRate(
    interaction: ChatInputCommandInteraction,
    target: Attachment,
    fps: number,
    fileName: string
) {
    const response = await fetch(target.url);
    if (!response.ok) throw new Error(`Could not fetch video`);

    fs.writeFileSync(
        `./${fileName}`,
        Buffer.from(await response.arrayBuffer())
    );

    const outputStream = new MemoryStream();

    ffmpeg.setFfmpegPath(ffmpegPath ?? "");
    ffmpeg()
        .input(`./${fileName}`)
        .outputOptions(["-crf 10", "-movflags frag_keyframe+empty_moov"])
        .videoFilters(
            `minterpolate=fps=${fps}:mi_mode=mci:mc_mode=aobmc:me_mode=bidir:vsbmc=1`
        )
        .on("start", async () => {
            await interaction.reply({
                content: `Interpolating **${target.name}** to **${fps}fps** ... Process started - ${interaction.user}`,
                ephemeral: true,
            });
        })
        .on("progress", async (progress) => {
            if (progress.percent >= 0) {
                await interaction.editReply({
                    content: `Requested by ${
                        interaction.user
                    }\nProcessing video (${Math.ceil(progress.percent)}%)`,
                });
            }
        })
        .on("error", (e) => {
            fs.unlinkSync(`./${fileName}`);
            throw e;
        })
        .on("end", async () => {
            const channel = await interaction.client.channels.fetch(
                interaction.channelId
            );
            if (!channel?.isTextBased()) return;
            await channel.send({
                content: `Video processed - ${interaction.user}`,
                files: [{ name: `${fileName}.mp4`, attachment: outputStream }],
            });
            fs.unlinkSync(`./${fileName}`);
            await interaction.deleteReply();
        })
        .toFormat("mp4")
        .writeToStream(outputStream);
}

export default commands;
