"use client";

import { FC, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Loader2 } from "lucide-react";

export { ThemeProvider } from "next-themes";

export const ThemeSwitcher: FC = () => {
    const [mounted, setMounted] = useState(false);
    const { setTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted)
        return (
            <Button variant="outline" size="icon">
                <Loader2 className="h-[1.2rem] w-[1.2rem] animate-spin" />
            </Button>
        );

    return (
        <DropdownMenu>
            <Button variant="outline" className="relative" size="icon" asChild>
                <DropdownMenuTrigger>
                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                </DropdownMenuTrigger>
            </Button>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                    Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                    Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                    System
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
