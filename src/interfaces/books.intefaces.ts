import { AnyZodObject, z } from "zod";
import { arryBookSchema, bookSchema, createBookBodySchema, updateBookBodySchema } from "../schemas/books.schemas";

export type TBook = z.infer<typeof bookSchema>;

export type TCreateBookType = z.infer<typeof createBookBodySchema>;

export type TEditBookType = z.infer<typeof updateBookBodySchema>;

export type ArrayBook = z.infer<typeof arryBookSchema>;

export interface RequestSchemasType {
   body?: AnyZodObject;
   query?: AnyZodObject;
}
