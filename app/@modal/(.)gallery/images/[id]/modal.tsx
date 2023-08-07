"use client";

import type { FC, PropsWithChildren } from "react";
import { Dialog as DialogUI } from "@/components/ui/dialog";
import {
    usePathname,
    useRouter,
    useSelectedLayoutSegment,
} from "next/navigation";
import { useEffect, useState } from "react";
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
