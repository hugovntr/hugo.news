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
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden p-4">
            <div
                onClick={handleExit}
                className="bg-background/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 backdrop-blur-sm"
            />

            {children}
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
