import { z } from "zod";

export const blogMetaSchema = z
    .object({
        title: z.string(),
        summary: z.string(),
        createdAt: z.string(),
        updatedAt: z.string().optional(),
    })
    .transform((d) => ({
        ...d,
        createdAt: new Date(d.createdAt),
        updatedAt: d.updatedAt ? new Date(d.updatedAt) : undefined,
    }));
