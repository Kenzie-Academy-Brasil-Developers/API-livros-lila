import { NextFunction, Request, Response } from "express";
import { booksDatabase } from "../database/database";
import { AppError } from "../errors/AppErros";
import { TBook } from "../interfaces/books.intefaces";

export class BookMiddlewares {
    verifyBookId = (req: Request, _res: Response, next: NextFunction): void => {
        const bookId = Number(req.params.id);
        if (isNaN(bookId) || bookId <= 0) {
            throw new AppError(400, "Invalid book ID.");
        }
        const index = booksDatabase.findIndex((book) => book.id === bookId);
        if (index === -1) {
            throw new AppError(404, "Book not found.")
        }
        return next();
};

    verifyBookName = (req: Request, _res: Response, next: NextFunction): void => {
        const { name } = req.body;
        const nameExists: TBook | undefined = booksDatabase.find(
            (book) => book.name === name
        );
        if (nameExists) {
            throw new AppError(409, "Book already registered.");
        }
        return next();
    };
};



   