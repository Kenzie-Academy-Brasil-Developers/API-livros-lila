import { z } from "zod";

export const createBookSchema = z.object({
    name: z.string().min(2),
    pages: z.number().min(1),
    category: z.string(),
})





