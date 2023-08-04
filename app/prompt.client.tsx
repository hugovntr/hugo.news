"use client";

import type { FC, MouseEvent } from "react";
import type { Prompt } from "@/lib/prompt";
import { useToast } from "@/components/ui/use-toast";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Copy, Info } from "lucide-react";
import { camelToTitle } from "@/lib/utils";

export const PromptPopover: FC<Prompt> = (prompt) => {
    const { text, raw, height, width, ...attrs } = prompt;
    const { toast } = useToast();

    const handleCopy = async (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        navigator.clipboard
            .writeText(raw)
            .then(() =>
                toast({ description: "Prompt copied to your clipboard" })
            )
            .catch(() =>
                toast({
                    description: "Could not copy prompt to your clipboard",
                })
            );
    };

    return (
        <Popover>
            <PopoverTrigger
                asChild={true}
                className="ml-auto mr-4 mt-4 self-start bg-muted"
            >
                <Button
                    size="icon"
                    className="h-8 w-8 rounded bg-black/30 text-brand-400 backdrop-blur hover:bg-brand-500 hover:text-brand-50"
                >
                    <Info className="h-5 w-5" />
                </Button>
            </PopoverTrigger>
            <PopoverContent
                side={"bottom"}
                align={"end"}
                sideOffset={16}
                className="prompt-popover-content"
            >
                <table>
                    <tbody>
                        <tr>
                            <th className="flex flex-col">
                                <span>Prompt</span>
                                {text.length > 1 && (
                                    <span className="mt-1 rounded-full bg-brand-100 py-0.5 text-center text-xs font-medium text-brand-600 dark:bg-brand-950">
                                        Multi
                                    </span>
                                )}
                            </th>
                            <td className="space-y-8">
                                {text.map((t, i) => (
                                    <p key={i}>{t}</p>
                                ))}
                            </td>
                        </tr>
                        {Object.entries(attrs).map(([key, value]) => (
                            <tr key={key}>
                                <th>{camelToTitle(key)}</th>
                                <td>{value}</td>
                            </tr>
                        ))}
                        <tr>
                            <th>Size</th>
                            <td>
                                {width} &times; {height}
                            </td>
                        </tr>
                    </tbody>
                </table>
                <Button onClick={handleCopy} className="mt-4 w-full">
                    <Copy className="mr-2 h-4 w-4" />
                    Copy
                </Button>
            </PopoverContent>
        </Popover>
    );
};
