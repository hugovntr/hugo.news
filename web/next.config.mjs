/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,
        externalDir: true
    },
    images: {
        minimumCacheTTL: 3600,
        domains: ['camo.githubusercontent.com', 'avatars.githubusercontent.com'],
        remotePatterns: [
            { protocol: "https", hostname: "**.midjourney.com" },
            { protocol: "https", hostname: "**.amazonaws.com" },
            { protocol: "https", hostname: "**.discordapp.com" },
        ]
    },

    modularizeImports: {
        'lucide-react': {
            transform: 'lucide-react/{{member}}',
            skipDefaultConversion: true,
            preventFullImport: true,
        },
    },
};
export default nextConfig
