import { defineDocumentType, makeSource } from "contentlayer/source-files";

export const Blog = defineDocumentType(() => ({
    name: "Blog",
    filePathPattern: `**/*.mdx`,
    contentType: "mdx",
    fields: {
        title: {
            type: "string",
            description: "The title of the blog post",
            required: true,
        },
    },
    computedFields: {
        slug: {
            type: "string",
            resolve: (document) => document._raw.flattenedPath,
        },
    },
}));

export default makeSource({
    contentDirPath: "content",
    documentTypes: [Blog],
});
