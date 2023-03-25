import { defineDocumentType, makeSource } from "contentlayer/source-files";

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
        publishedAt: {
            type: "date",
            required: true,
        },
    },
    computedFields: {
        slug: {
            type: "string",
            resolve: (document) =>
                document._raw.sourceFileName.replace(".mdx", ""),
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
});