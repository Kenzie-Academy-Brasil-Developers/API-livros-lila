import { z } from "zod";

export const bookSchema = z.object({
    id: z.number().positive(),
    name: z.string().nullish(),
    pages: z.number().nullish(),
    category: z.string().optional(),
    createdAt: z.date(),
    updatedAt: z.date(),
});

export const createBookBodySchema = bookSchema.pick({
    name: true,
    pages: true,
    category: true,
});

export const updateBookBodySchema = createBookBodySchema.partial();

export const arryBookSchema = bookSchema.array();





