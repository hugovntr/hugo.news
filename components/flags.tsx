import { CSSProperties, FC } from "react";

interface SVGProps extends Omit<FlagProps, "lang" | "variant"> {
    style?: CSSProperties | undefined;
    title: string;
}

const flags = {
    fr: (props: SVGProps) => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 15" {...props}>
            <path fill="#EE2A39" d="M10 0h11v15H10z" />
            <path fill="#1035BB" d="M0 0h7v15H0z" />
            <path fill="#FFF" d="M7 0h7v15H7z" />
        </svg>
    ),
    en: (props: SVGProps) => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 15" {...props}>
            <defs>
                <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="a">
                    <stop stopColor="#FFF" offset="0%" />
                    <stop stopColor="#F0F0F0" offset="100%" />
                </linearGradient>
                <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="b">
                    <stop stopColor="#D02F44" offset="0%" />
                    <stop stopColor="#B12537" offset="100%" />
                </linearGradient>
                <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="c">
                    <stop stopColor="#46467F" offset="0%" />
                    <stop stopColor="#3C3C6D" offset="100%" />
                </linearGradient>
            </defs>
            <g fill="none" fillRule="evenodd">
                <path fill="url(#a)" d="M0 0h21v15H0z" />
                <path
                    d="M0 0h21v1H0V0Zm0 2h21v1H0V2Zm0 2h21v1H0V4Zm0 2h21v1H0V6Zm0 2h21v1H0V8Zm0 2h21v1H0v-1Zm0 2h21v1H0v-1Zm0 2h21v1H0v-1Z"
                    fill="url(#b)"
                />
                <path fill="url(#c)" d="M0 0h9v7H0z" />
                <path
                    d="M1.5 2a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1Zm2 0a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1Zm2 0a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1Zm2 0a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1Zm-5 1a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1Zm2 0a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1Zm2 0a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1Zm1 1a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1Zm-2 0a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1Zm-2 0a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1Zm-2 0a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1Zm1 1a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1Zm2 0a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1Zm2 0a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1Zm1 1a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1Zm-2 0a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1Zm-2 0a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1Zm-2 0a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1Z"
                    fill="url(#a)"
                />
            </g>
        </svg>
    ),
};
const variants = ["rounded", "square", "circle"] as const;
type FlagProps = {
    lang: keyof typeof flags;
    variant?: (typeof variants)[number] | undefined;
    className?: string;
};

const variantStyle: { [key in (typeof variants)[number]]: CSSProperties } = {
    rounded: {
        display: "inline-block",
        clipPath: "polygon(10% 10%, 90% 10%, 90% 90%, 10% 90%)",
        borderRadius: "50%",
    },
    square: {
        display: "inline-block",
        clipPath: "polygon(10% 10%, 90% 10%, 90% 90%, 10% 90%)",
    },
    circle: {
        display: "inline-block",
        height: "auto",
        margin: 0,
        borderRadius: "50%",
    },
};

export const Flag: FC<FlagProps> = (props) => {
    const { lang, ...svgProps } = props;
    const Component = flags[lang];
    const style = svgProps.variant ? variantStyle[svgProps.variant] : undefined; // Thanks typescript

    return <Component {...svgProps} style={style} title={lang} />;
};
