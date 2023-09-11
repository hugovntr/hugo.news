"use client";

import { FC } from "react";
import Image, { ImageProps } from "next/image";

export const ImageClient: FC<ImageProps> = (props) => {
    return <Image {...props} />;
};
