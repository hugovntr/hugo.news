import { FC } from "react";
import { RichText } from "@hugo/notion";

export const RenderTexts: FC<{ elements: RichText[] }> = ({ elements }) => {
    return (
        <>
            {elements.map((item) => (
                <RenderWithAttrs {...item} key={item.plain_text} />
            ))}
        </>
    );
};

const attrTags: {
    [p in keyof Omit<RichText["annotations"], "color">]: string;
} = {
    bold: "strong",
    italic: "em",
    strikethrough: "span",
    underline: "span",
    code: "code",
};

const RenderWithAttrs: FC<RichText> = (props) => {
    const {
        annotations: { color, ...attr },
        text,
    } = props;
    const activeAttrs: string[] = Object.entries(attr)
        .map(([k, v]) => (v ? k : false))
        .filter(Boolean) as string[];

    const El = activeAttrs.reduce(
        (acc, cur) => {
            const Wrapper = attrTags[cur as keyof typeof attrTags] as any;
            return <Wrapper>{acc}</Wrapper>;
        },
        <>{text.content}</>
    );

    return <>{El}</>;
};
