import { withContentlayer } from "next-contentlayer";

/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,
    },
    images: {
        domains: ['camo.githubusercontent.com'],
        remotePatterns: [
            { protocol: "https", hostname: "**.midjourney.com" },
            { protocol: "https", hostname: "**.amazonaws.com" },
        ]
    }
};
export default nextConfig
