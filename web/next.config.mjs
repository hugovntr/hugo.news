
/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        externalDir: true,
        serverComponentsExternalPackages: ["vscode-oniguruma", "shiki"]
    },
    images: {
        disableStaticImages: true,
        unoptimized: true,
        formats: ["image/avif", "image/webp"],
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

    webpack: (config, { webpack }) => {
        // noinspection JSUnresolvedReference
        config.plugins.push(
            new webpack.EnvironmentPlugin([
                "NOTION_TOKEN",
                "NOTION_IMAGES_DATABASE",
                "NOTION_POSTS_DATABASE",
                "NOTION_COLLECTIONS_DATABASE",
                "ENCRYPT_KEY",
                "GH_TOKEN",
            ])
        )
        return config;
    }
};
export default nextConfig
