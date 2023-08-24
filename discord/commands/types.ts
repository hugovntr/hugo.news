import {
    ChatInputCommandInteraction,
    ContextMenuCommandBuilder,
    MessageContextMenuCommandInteraction,
    SlashCommandBuilder,
} from "discord.js";

export type Command<
    T extends SlashCommandBuilder | ContextMenuCommandBuilder = any,
> = T extends SlashCommandBuilder
    ? {
          command: SlashCommandBuilder;
          handler: (interaction: ChatInputCommandInteraction) => Promise<void>;
      }
    : {
          command: ContextMenuCommandBuilder;
          handler: (
              interaction: MessageContextMenuCommandInteraction
          ) => Promise<void>;
      };
