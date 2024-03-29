/**
 * Remove markdown tags from string.
 *
 * @author https://github.com/stiang/remove-markdown
 * @param input
 */
export function stripMarkdown(input: string): string {
    return (
        input
            .replace(/\n={2,}/g, "\n")
            // Fenced codeblocks
            .replace(/~{3}.*\n/g, "")
            // Strikethrough
            .replace(/~~/g, "")
            // Fenced codeblocks
            .replace(/`{3}.*\n/g, "")
            .replace(/^[=\-]{2,}\s*$/g, "")
            // Remove footnotes?
            .replace(/\[\^.+?\](\: .*?$)?/g, "")
            .replace(/\s{0,2}\[.*?\]: .*?$/g, "")
            // Remove images
            .replace(/\!\[(.*?)\][\[\(].*?[\]\)]/g, "")
            // Remove inline links
            .replace(/\[([^\]]*?)\][\[\(].*?[\]\)]/g, "$1")
            // Remove blockquotes
            .replace(/^\s{0,3}>\s?/gm, "")
            // .replace(/(^|\n)\s{0,3}>\s?/g, '\n\n')
            // Remove reference-style links?
            .replace(/^\s{1,2}\[(.*?)\]: (\S+)( ".*?")?\s*$/g, "")
            // Remove atx-style headers
            .replace(
                /^(\n)?\s{0,}#{1,6}\s+| {0,}(\n)?\s{0,}#{0,} #{0,}(\n)?\s{0,}$/gm,
                "$1$2$3"
            )
            // Remove * emphasis
            .replace(/([\*]+)(\S)(.*?\S)??\1/g, "$2$3")
            // Remove _ emphasis. Unlike *, _ emphasis gets rendered only if
            //   1. Either there is a whitespace character before opening _ and after closing _.
            //   2. Or _ is at the start/end of the string.
            .replace(/(^|\W)([_]+)(\S)(.*?\S)??\2($|\W)/g, "$1$3$4$5")
            // Remove code blocks
            .replace(/(`{3,})(.*?)\1/gm, "$2")
            // Remove inline code
            .replace(/`(.+?)`/g, "$1")
            // // Replace two or more newlines with exactly two? Not entirely sure this belongs here...
            // .replace(/\n{2,}/g, '\n\n')
            // // Remove newlines in a paragraph
            // .replace(/(\S+)\n\s*(\S+)/g, '$1 $2')
            // Replace strike through
            .replace(/~(.*?)~/g, "$1")
    );
}

export function shortenString(
    input: string,
    length: number,
    separator = " "
): string {
    return input.substring(0, input.lastIndexOf(separator, length)) + "...";
}
