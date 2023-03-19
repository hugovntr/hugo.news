import { withContentlayer } from "next-contentlayer";

/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,
        mdxRs: true,
    },
};
export default withContentlayer(nextConfig)
