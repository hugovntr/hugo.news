import { useMDXComponent } from "next-contentlayer/hooks";
import type { FC } from "react";

type MdxProps = {
    code: string;
    className?: string | undefined;
};
export const Mdx: FC<MdxProps> = (props) => {
    const { code, className } = props;
    const Component = useMDXComponent(code);

    return (
        <article className={`prose ${className ?? ""}`}>
            <Component />
        </article>
    );
};
