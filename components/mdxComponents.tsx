"use client";

import {
    FC,
    ImgHTMLAttributes,
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";

const CustomImage: FC<ImgHTMLAttributes<HTMLImageElement>> = (props) => {
    const [visible, setVisible] = useState<boolean>(false);
    const imageRef = useRef<HTMLImageElement>(null);

    const callback = (entries: IntersectionObserverEntry[]) => {
        const [entry] = entries;
        console.log(entry.isIntersecting);
        entry.isIntersecting && setVisible(true);
    };

    useEffect(() => {
        const observer = new IntersectionObserver(callback, {
            root: null,
            rootMargin: "50%",
            threshold: 1.0,
        });
        const ref = imageRef.current;
        if (ref) observer.observe(ref);
        return () => {
            if (ref) observer.unobserve(ref);
        };
    }, [imageRef]);

    return (
        <img
            alt={props.alt}
            {...props}
            ref={imageRef}
            loading="lazy"
            style={{
                transition:
                    "transform 400ms ease-in-out, opacity 300ms ease-out",
                transform: visible ? "translateY(0)" : "translateY(2rem)",
                opacity: visible ? "1" : "0.5",
            }}
        />
    );
};

export const MDXComponents = {
    img: CustomImage,
};
