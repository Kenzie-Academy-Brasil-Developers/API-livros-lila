import { AnyZodObject, z } from "zod";
import { bookSchema, createBookBodySchema, updateBookBodySchema } from "../schemas/books.schemas";

type Book = z.infer<typeof bookSchema>;

type CreateBook = z.infer<typeof createBookBodySchema>;

type updateBook = z.infer<typeof updateBookBodySchema>;

type RequestSchemas = {
   body?: AnyZodObject;
   query?: AnyZodObject;
}

export { Book, CreateBook, updateBook, RequestSchemas };