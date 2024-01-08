import { AnyZodObject, z } from "zod";
import { createBookSchema } from "../schemas/createBooksBody.schemas";

type Book = z.infer<typeof createBookSchema>;

interface RequestSchema {
    parseAsync(body: any): import("express-serve-static-core").ParamsDictionary | PromiseLike<import("express-serve-static-core").ParamsDictionary>;
    params?: AnyZodObject;
    body?: AnyZodObject;
    query?: AnyZodObject;
}

export { Book, RequestSchema };