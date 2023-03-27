import { withContentlayer } from "next-contentlayer";

/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,
    },
    images: {
        domains: ['camo.githubusercontent.com']
    }
};
export default withContentlayer(nextConfig)
