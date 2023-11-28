import unifiedTypes, { unified } from "unified";
import { modifyChildren } from "unist-util-modify-children";
import { toText } from "hast-util-to-text";
import { type Highlighter } from "shiki";
import rehypeParse from "rehype-parse";

const hastParser = unified().use(rehypeParse, { fragment: true });

type PluginParams = unifiedTypes.Plugin<
    [{ highlighter: Highlighter; throwOnUnsupported?: boolean }]
>;

const plugin: PluginParams =
    ({ highlighter, throwOnUnsupported = false }) =>
    (tree) => {
        modifyChildren((node: any, index, parent) => {
            if (
                node.tagName === "pre" &&
                Array.isArray(node.children) &&
                node.children.length === 1 &&
                node.children[0].tagName === "code" &&
                typeof node.children[0].properties === "object" &&
                node.children[0].properties !== null &&
                Array.isArray(node.children[0].properties.className) &&
                typeof node.children[0].properties.className[0] === "string" &&
                node.children[0].properties.className[0].startsWith("language-")
            ) {
                const code = toText(node).slice(0, -1);
                const lang = node.children[0].properties.className[0].slice(
                    "language-".length
                );
                try {
                    const output = hastParser.parse(
                        highlighter.codeToHtml(code, { lang })
                    );
                    const preElement = output.children.find(
                        (child) => child.type === "element"
                    );
                    preElement.position = node.position;
                    if (preElement.hasOwnProperty("properties")) {
                        preElement["properties"] = {
                            ...preElement["properties"],
                            ...node.properties,
                            lang,
                        };
                    }
                    parent.children.splice(index, 1, ...output.children);
                    return index + output.children.length;
                } catch (error) {
                    if (throwOnUnsupported) throw error;
                    else return;
                }
            }
        })(tree as any);
    };

export default plugin;
