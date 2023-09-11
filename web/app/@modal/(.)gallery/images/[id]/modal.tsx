"use client";

import type { FC, PropsWithChildren, MouseEvent } from "react";
import { Dialog as DialogUI } from "@/components/ui/dialog";
import { usePathname, useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import type { NotionImageDatabaseItem } from "@hugo/notion/types";
import { getImageInfos } from "@/lib/images";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
export { DialogContent } from "@/components/ui/dialog";

export const Dialog: FC<PropsWithChildren<{}>> = (props) => {
    const [open, setOpen] = useState(false);
    const nextRouter = useRouter();

    const pathname = usePathname();
    useEffect(() => {
        setOpen(() => pathname.startsWith("/gallery/images"));
    }, [pathname]);

    const handleOpenChange = (open: boolean) => {
        console.log("[CHANGE] Change state");
        if (!open) nextRouter.back();
    };
    return (
        <DialogUI open={open} onOpenChange={handleOpenChange}>
            {props.children}
        </DialogUI>
    );
};

export const Modal: FC<PropsWithChildren<{}>> = (props) => {
    const { children } = props;
    const nextRouter = useRouter();

    const handleExit = (
        event: MouseEvent<HTMLButtonElement | HTMLDivElement>
    ) => {
        event.preventDefault();
        nextRouter.back();
    };

    const Slot = (
        <div className="fixed inset-0 z-50 flex items-end justify-center overflow-hidden md:items-center">
            <div
                onClick={handleExit}
                className="bg-background/80 animate-in fade-in-0 fixed inset-0 backdrop-blur-sm"
            />

            <div className="slide-in-from-bottom fade-in-0 md:slide-in-from-bottom-0 md:zoom-in-90 animate-in relative flex max-h-full max-w-full flex-col md:p-4">
                <button
                    className="flex h-16 w-full items-end justify-center pb-4 md:hidden"
                    onClick={handleExit}
                >
                    <span className="bg-muted h-2 w-24 rounded-full" />
                </button>
                {children}
            </div>
        </div>
    );

    return createPortal(Slot, document.body);
};

export const ModalClose: FC = () => {
    const nextRouter = useRouter();

    const handleExit = (
        event: MouseEvent<HTMLButtonElement | HTMLDivElement>
    ) => {
        event.preventDefault();
        nextRouter.back();
    };

    return (
        <Button
            onClick={handleExit}
            variant="ghost"
            size="icon"
            className="flex-shrink-0"
        >
            <X className="h-4 w-4" />
        </Button>
    );
};
