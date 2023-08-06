export interface Prompt {
    text: string[];
    raw: string;
    aspectRatio: string;
    width: number;
    height: number;
    style?: string;
    stylize?: number;
}

const PARAMETERS: Record<string, keyof Prompt> = {
    s: "stylize",
    style: "style",
    ar: "aspectRatio",
};

const SIZES: Record<string, { width: number; height: number }> = {
    "1:1": { width: 1024, height: 1024 },
    "1:2": { width: 768, height: 1536 },
    "2:3": { width: 896, height: 1344 },
    "4:3": { width: 1232, height: 928 },
    "16:9": { width: 1456, height: 816 },
    "21:9": { width: 1680, height: 720 },
};

export function parsePrompt(text: string): Prompt {
    return text.split("--").reduce(
        (acc: Prompt, cur: string) => {
            // Extract text element(s)
            if (!acc.text.length) {
                acc.text = cur.split("::").map((i) => i.trim());
                return acc;
            }

            // Extract parameters
            const [key, value] = cur.split(" ");
            const promptKey = PARAMETERS[key];

            if (promptKey) {
                acc = { ...acc, [promptKey]: value };
            }

            // Extract image size
            const size = SIZES[acc.aspectRatio];
            return { ...acc, ...size };
        },
        { text: [], raw: text, aspectRatio: "1:1", height: 400, width: 400 }
    );
}
