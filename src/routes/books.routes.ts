import { Router } from "express";
import { BooksControllers } from "../controllers/books.controllers";
import { BookMiddlewares } from "../middlewares/books.middlewares";


export const booksRouter = Router();
const booksControllers = new BooksControllers();
const bookMiddlewares = new  BookMiddlewares();

booksRouter.post("/", bookMiddlewares.verifyBookRegister,
booksControllers.createBook);
booksRouter.get("/", booksControllers.getBooks);

booksRouter.param("/:id", bookMiddlewares.verifyBookId);

booksRouter.get("/:id", booksControllers.getSingleBook);
booksRouter.patch("/:id", bookMiddlewares.verifyBookRegister,
booksControllers.updateBook);
booksRouter.delete("/:id", booksControllers.deleteBook);

