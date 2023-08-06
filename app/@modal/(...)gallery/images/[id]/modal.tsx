"use client";

import type { FC, PropsWithChildren } from "react";
import { Dialog as DialogUI } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
export { DialogContent } from "@/components/ui/dialog";

export const Dialog: FC<PropsWithChildren<{}>> = (props) => {
    const nextRouter = useRouter();

    const handleOpenChange = (open: boolean) => {
        if (!open) nextRouter.back();
    };
    return (
        <DialogUI open onOpenChange={handleOpenChange}>
            {props.children}
        </DialogUI>
    );
};
