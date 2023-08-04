"use client";

import { FC, PropsWithChildren, useMemo } from "react";
import Image from "next/image";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Copyright } from "@/components/copyright";
import { PromptPopoverContent } from "@/app/prompt.client";

interface ImageZoomableProps extends PropsWithChildren {
    src: string;
    height: number;
    width: number;
    alt: string;
}
export const ImageZoomable: FC<ImageZoomableProps> = (props) => {
    const { children, ...rest } = props;
    const ar = () => {
        const gcd = (a: number, b: number): number =>
            b === 0 ? a : gcd(b, a % b);
        const r = gcd(rest.width, rest.height);
        return `${rest.width / r}/${rest.height / r}`;
    };
    const Component = () =>
        useMemo(
            () => (
                <Image
                    {...rest}
                    alt={rest.alt}
                    unoptimized={true}
                    className="h-full"
                />
            ),
            []
        );

    return (
        <Dialog>
            <DialogTrigger className="flex-1 overflow-hidden rounded-md border border-border">
                <Component />
            </DialogTrigger>
            <DialogContent className="max-w-screen flex h-auto max-h-screen w-full gap-0 overflow-hidden p-0 md:max-h-[calc(100vh_-_2rem)] md:w-max md:max-w-[calc(100vw_-_2rem)]">
                <div className="max-h-screen" style={{ aspectRatio: ar() }}>
                    <Component />
                </div>
                {children && (
                    <div className="hidden w-full max-w-xs border-l border-border p-4 pt-12 lg:flex lg:flex-col">
                        {children}
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
};
