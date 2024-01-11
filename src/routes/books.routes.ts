import { Router } from "express";
import { BooksControllers } from "../controllers/books.controllers";
import { GlobalErros } from "../errors/GlobalErrors";
import { createBookBodySchema } from "../schemas/books.schemas";
import { ValidateBody } from "../middlewares/validateBody.middlewares";
import { BookMiddlewares } from "../middlewares/books.middleware";


export const booksRouter = Router();
export const booksControllers = new BooksControllers();
export const bookMiddlewares = new BookMiddlewares();
export const GlobalErrors = new GlobalErros();

booksRouter.get("/", booksControllers.getBooks);

booksRouter.post(
    "/",
    ValidateBody.execute({body: createBookBodySchema}),
    bookMiddlewares.verifyBookRegister,
    booksControllers.createBook);

booksRouter.patch(
    "/:id",
    ValidateBody.execute({body: createBookBodySchema}),
    bookMiddlewares.verifyBookId ,
    bookMiddlewares.verifyBookRegister,
    booksControllers.updateBook);

booksRouter.get("/:id", bookMiddlewares.verifyBookId, booksControllers.getSingleBook);

booksRouter.delete("/:id", bookMiddlewares.verifyBookId, booksControllers.deleteBook);

