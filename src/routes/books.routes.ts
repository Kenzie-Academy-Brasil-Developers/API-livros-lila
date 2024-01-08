import { Router } from "express";
import { BooksControllers } from "../controllers/books.controllers";
import { BookMiddlewares } from "../middlewares/books.middlewares";
import { GlobalErros } from "../errors/GlobalErrors";
import { ValidateBody } from "../middlewares/validateBody.middlewares";
import { createBookSchema } from "../schemas/createBooksBody.schemas";


export const booksRouter = Router();
export const booksControllers = new BooksControllers();
export const bookMiddlewares = new  BookMiddlewares();
export const GlobalErrors = new GlobalErros();

booksRouter.get("/", booksControllers.getBooks);

booksRouter.use("/:id", bookMiddlewares.verifyBookId);

booksRouter.post(
    "/",
    ValidateBody.execute({body: createBookSchema}),
    bookMiddlewares.verifyBookRegister,
    booksControllers.createBook);

booksRouter.patch(
    "/:id",
    ValidateBody.execute({body: createBookSchema}),
    bookMiddlewares.verifyBookRegister,
    booksControllers.updateBook);

booksRouter.get("/:id", booksControllers.getSingleBook);

booksRouter.delete("/:id", booksControllers.deleteBook);

