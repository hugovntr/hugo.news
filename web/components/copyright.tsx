import { FC, HTMLAttributes } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export const Copyright: FC<HTMLAttributes<HTMLDivElement>> = (props) => {
    return (
        <div
            {...props}
            className={cn("inline-flex items-center gap-2", props.className)}
        >
            <Image
                src={"https://avatars.githubusercontent.com/hugovntr"}
                height={96}
                width={96}
                alt="Hugo Ventura"
                className="h-8 w-8 rounded-full object-cover"
            />
            <p className="text-muted-foreground text-sm">
                Made by{" "}
                <span className="decoration-muted font-semibold underline underline-offset-2">
                    Hugo Ventura
                </span>
            </p>
        </div>
    );
};
