import {
    Client,
    ContextMenuCommandBuilder,
    REST,
    Routes,
    SlashCommandBuilder,
} from "discord.js";
import * as dotenv from "dotenv";
import { exit } from "node:process";
import type { Command } from "./commands/types";
import * as fs from "fs/promises";
import * as path from "path";

dotenv.config();
dotenv.config({ path: ".env.local", override: true });

console.log("Discord bot starting...");

const client = new Client({
    intents: [],
});
// noinspection JSUnresolvedReference
const token = process.env.DISCORD_TOKEN;
// noinspection JSUnresolvedReference
const clientId = process.env.DISCORD_APPLICATION_ID;

async function register() {
    if (!token || !clientId) exit(1);

    const rest = new REST({ version: "10" }).setToken(token);

    const commands = await fetchCommands();

    rest.put(Routes.applicationCommands(clientId), {
        body: commands.map((c) => c.command.toJSON()),
    }).then(() => {
        console.log("Registered application (/) commands.");
        console.log("Registered context menu commands.");
    });

    return commands;
}

async function fetchCommands() {
    let commands: Command[] = [];
    const files = (
        await fs.readdir(path.join(__dirname, "commands"), {
            recursive: true,
            withFileTypes: true,
        })
    ).filter((f) => f.isFile() && f.name === "command.ts");

    for (const file of files) {
        const mod: Command[] = await import(
            path.join(file.path, file.name)
        ).then((m) => m.default);
        commands = [...commands, ...mod];
    }

    return commands;
}

register()
    .then((commands) => {
        client.on("ready", () => {
            console.log(`${client.user?.username} is online`);
        });

        client.on("interactionCreate", async (interaction) => {
            if (interaction.isChatInputCommand()) {
                const command = commands
                    .filter((i) => i.command instanceof SlashCommandBuilder)
                    .find((c) => c.command.name === interaction.commandName) as
                    | Command<SlashCommandBuilder>
                    | undefined;
                await command?.handler(interaction);
                return;
            }

            if (interaction.isMessageContextMenuCommand()) {
                const command = commands
                    .filter(
                        (i) => i.command instanceof ContextMenuCommandBuilder
                    )
                    .find((c) => c.command.name === interaction.commandName) as
                    | Command<ContextMenuCommandBuilder>
                    | undefined;
                await command?.handler(interaction);
                return;
            }

            return;
        });

        client.login(token).then();
    })
    .catch(() => {
        console.error("Failed to register commands");
        exit(1);
    });
