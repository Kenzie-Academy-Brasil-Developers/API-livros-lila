import { Router } from "express";
import { BooksControllers } from "../controllers/books.controllers";
import { GlobalErros } from "../errors/handleErrors";
import { createBookBodySchema, updateBookBodySchema } from "../schemas/books.schemas";
import { ValidateRequest } from "../middlewares/validateRequest.middlewares";
import { BookMiddlewares } from "../middlewares/books.middleware";

export const booksRouter = Router();
export const booksControllers = new BooksControllers();
export const bookMiddlewares = new BookMiddlewares();
export const globalErrors = new GlobalErros();

booksRouter.get("/", booksControllers.getBooks);

booksRouter.post(
    "/",
    ValidateRequest.execute({body: createBookBodySchema}),
    globalErrors.validateBody({query: createBookBodySchema}),
    bookMiddlewares.verifyBookRegister,
    booksControllers.createBook);

booksRouter.patch(
    "/:id",
    ValidateRequest.execute({body: createBookBodySchema}),
    globalErrors.validateBody({query: updateBookBodySchema}),
    bookMiddlewares.verifyBookId ,
    bookMiddlewares.verifyBookRegister,
    booksControllers.editBook);

booksRouter.get("/:id", bookMiddlewares.verifyBookId, booksControllers.getSingleBook);

booksRouter.delete("/:id", bookMiddlewares.verifyBookId, booksControllers.deleteBook);

