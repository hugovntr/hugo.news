import { useMDXComponent } from "next-contentlayer/hooks";
import type { FC } from "react";

type MdxProps = {
    code: string;
};
export const Mdx: FC<MdxProps> = (props) => {
    const { code } = props;
    const Component = useMDXComponent(code);

    return (
        <article className="prose">
            <Component />
        </article>
    );
};
