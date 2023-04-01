"use client";

import { useMDXComponent } from "next-contentlayer/hooks";
import type { FC } from "react";
import { MDXComponents } from "@/components/mdxComponents";

type MdxProps = {
    code: string;
    className?: string | undefined;
};
export const Mdx: FC<MdxProps> = (props) => {
    const { code, className } = props;
    const Component = useMDXComponent(code);

    return (
        <main className={`prose ${className ?? ""}`}>
            <Component components={MDXComponents} />
        </main>
    );
};
