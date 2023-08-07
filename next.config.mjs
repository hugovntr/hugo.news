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
