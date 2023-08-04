import { FC, HTMLAttributes } from "react";
import Image from "next/image";
import Me from "@/app/me.jpeg";
import { cn } from "@/lib/utils";

export const Copyright: FC<HTMLAttributes<HTMLDivElement>> = (props) => {
    return (
        <div
            {...props}
            className={cn("inline-flex items-center gap-2", props.className)}
        >
            <Image
                src={Me}
                alt="Hugo Ventura"
                className="h-8 w-8 rounded-full object-cover"
            />
            <p className="text-sm text-muted-foreground">
                Made by{" "}
                <span className="font-semibold underline decoration-muted underline-offset-2">
                    Hugo Ventura
                </span>
            </p>
        </div>
    );
};
