import { NextFunction, Request, Response } from "express";
import { booksDatabase } from "../database/database";
import { AppError } from "../errors/AppErros";

export class BookMiddlewares {
    verifyBookId = (req: Request, res: Response, next: NextFunction): void => {
        const bookId = Number(req.params.id);
        const index = booksDatabase.findIndex((book) => book.id === bookId);

        if (index === -1) {
            return next(new AppError(404, "Book not found."));
        }
        res.locals.bookId = bookId;

        return next();
    };

    verifyBookRegister = (req: Request, res: Response, next: NextFunction): void => {
        const { name, owner } = req.body;

        const bookFound = booksDatabase.find((book) => book.name === name && book.owner === owner);

        if(bookFound) {
            return next(new AppError(409, "Book already registered."));
        };

        return next();
    };
}