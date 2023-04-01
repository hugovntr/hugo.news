import { defineDocumentType, makeSource } from "contentlayer/source-files";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";
import { shortenString, stripMarkdown } from "./utils/string";

export const Blog = defineDocumentType(() => ({
    name: "Blog",
    filePathPattern: `blog/*.mdx`,
    contentType: "mdx",
    fields: {
        title: {
            type: "string",
            description: "The title of the blog post",
            required: true,
        },
        createdAt: {
            type: "date",
            required: true,
        },
        lang: {
            type: "enum",
            options: ["fr", "en"],
            default: "fr",
        },
        tags: {
            type: "list",
            of: { type: "string" },
        },
    },
    computedFields: {
        slug: {
            type: "string",
            resolve: (document) =>
                document._raw.sourceFileName.replace(".mdx", ""),
        },
        readingTime: {
            type: "number",
            resolve: (document) =>
                Math.ceil(document.body.raw.split(/\s+/gu).length / 225),
        },
        wordCount: {
            type: "number",
            resolve: (document) => document.body.raw.split(/\s+/gu).length,
        },
        summary: {
            type: "string",
            resolve: (document) =>
                shortenString(stripMarkdown(document.body.raw), 240),
        },
    },
}));

export const Project = defineDocumentType(() => ({
    name: "Project",
    filePathPattern: `projects/*.mdx`,
    contentType: "mdx",
    fields: {
        name: {
            type: "string",
            required: true,
        },
        link: {
            type: "string",
            required: true,
        },
        role: {
            type: "string",
            required: true,
        },
        banner: {
            type: "string",
        },
        tags: {
            type: "list",
            of: { type: "string" },
        },
    },
}));

export default makeSource({
    contentDirPath: "content",
    documentTypes: [Blog, Project],
    mdx: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
            [
                rehypePrettyCode,
                {
                    theme: "github-dark",
                    onVisitLine(node: any) {
                        // Prevent lines from collapsing in `display: grid` mode, and
                        // allow empty lines to be copy/pasted
                        if (node.children.length === 0) {
                            node.children = [{ type: "text", value: " " }];
                        }
                    },
                    onVisitHighlightedLine(node: any) {
                        // Each line node by default has `class="line"`.
                        node.properties.className.push("highlighted");
                    },
                    onVisitHighlightedWord(node: any) {
                        // Each word node has no className by default.
                        node.properties.className = ["word"];
                    },
                },
            ],
        ],
    },
});
