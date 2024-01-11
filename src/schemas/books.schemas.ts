import { z } from "zod";

// interface IRequestSchemas{
//     parse(body: any): any;
//     id: "number";
//     name: "string";
//     pages: "number";
//     category: "string";
// }

export const bookSchema = z.object({
    id: z.number().positive(),
    name: z.string().min(3),
    pages: z.number().min(1),
    category: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
})

// export const createBookBodySchema = z.object({
//     name: z.string().min(3),
//     pages: z.number().min(1),
//     category: z.string(),
// })
export const createBookBodySchema = bookSchema.pick({
    name: true,
    pages: true,
    category: true,
})

export const updateBookBodySchema = createBookBodySchema.partial();





