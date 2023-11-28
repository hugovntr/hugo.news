import fs from "fs";
import path from "path";
import { evaluate } from "@mdx-js/mdx";
import { z, ZodSchema } from "zod";
import { Fragment } from "react";
import * as runtime from "react/jsx-runtime";
import rehypeShiki from "@/lib/rehypeShiki";
import rehypeToc from "@jsdevtools/rehype-toc";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { mdxAnnotations } from "mdx-annotations";
import { getHighlighter } from "shiki";
import remarkGfm from "remark-gfm";

const CONTENT_DIR = "content";

export class ContentManager {
    public readonly path: string;

    constructor(public readonly uri: string) {
        this.path = path.join(process.cwd(), CONTENT_DIR, uri);
    }

    exists(slug: string): boolean {
        return fs.existsSync(path.join(this.path, `${slug}.md`));
    }

    entries(): string[] {
        return fs
            .readdirSync(this.path, { withFileTypes: true })
            .filter(
                (entry) =>
                    entry.isFile() &&
                    (entry.name.endsWith(".mdx") || entry.name.endsWith(".md"))
            )
            .map((entry) => ({
                ...entry,
                createdAt: fs.statSync(path.join(entry.path, entry.name))
                    .birthtimeMs,
            }))
            .sort((a, b) => b.createdAt - a.createdAt)
            .map((entry) => entry.name.replace(/.mdx?/g, ""));
    }

    async get<S extends ZodSchema>(slug: string, metaSchema: S) {
        if (!this.exists(slug))
            throw new Error(`No document found with slug [${slug}]`);
        return new Content(this.path, "/" + this.uri, slug, metaSchema);
    }
}

class Content<T extends ZodSchema> {
    constructor(
        public readonly path: string,
        private readonly _uri: string,
        public readonly slug: string,
        private readonly schema: T
    ) {}

    private _getContent(raw?: boolean) {
        const content = fs.readFileSync(
            path.join(this.path, `${this.slug}.md`),
            {
                encoding: "utf-8",
            }
        );

        if (raw) return content;
        const match = metadataRegex.exec(content);
        return content.replace(match[0], "").trim();
    }

    get meta() {
        const metaSchema = z.object({ uri: z.string() }).and(this.schema);
        return metaSchema.parse({
            uri: path.join(this._uri, this.slug),
            ...parseMetadata(this._getContent(true)),
        });
    }

    get content() {
        return this._getContent();
    }

    get raw() {
        return this._getContent(true);
    }
}

const metadataPattern =
    "^(" +
    "(= yaml =|---)" +
    "$([\\s\\S]*?)" +
    "^(?:\\2|\\.\\.\\.)\\s*" +
    "$" +
    "(?:\\n)?)";
const metadataRegex = new RegExp(metadataPattern, "m");

function parseMetadata(content: string) {
    const match = metadataRegex.exec(content);
    if (match) {
        const meta: { [k: string]: any } = {};
        const raw = match[match.length - 1].replace(/^\s+|\s+$/g, "");
        raw.split("\n")
            .map((line) => {
                return line
                    .split(":", 2)
                    .map((v) => v.trim().replace(/(^"|"$)/g, ""));
            })
            .map(([key, value]) => (meta[key] = value));

        return meta;
    }
    return {};
}

export async function renderContent(content: string) {
    const highlighter = await getHighlighter({ theme: "github-dark" });
    return evaluate(content, {
        remarkPlugins: [mdxAnnotations.remark, remarkGfm],
        rehypePlugins: [
            [mdxAnnotations.rehype],
            [rehypeShiki, { highlighter }],
            [rehypeSlug],
            [rehypeAutolinkHeadings],
            [
                rehypeToc,
                {
                    headings: ["h2", "h3"],
                },
            ],
        ],
        recmaPlugins: [[mdxAnnotations.recma]],
        Fragment,
        ...runtime,
        baseUrl: import.meta.url,
    });
}
