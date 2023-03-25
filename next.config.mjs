import { withContentlayer } from "next-contentlayer";

/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,
        mdxRs: true,
    },
    images: {
        domains: ['camo.githubusercontent.com']
    }
};
export default withContentlayer(nextConfig)
