import { NextFunction, Request, Response } from "express";
import { booksDatabase } from "../database/database";
import { AppError } from "../errors/AppErros";

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

    verifyBookRegister = (req: Request, _res: Response, next: NextFunction): void => {
        const { name, category } = req.body;
        if (!name || typeof name !== "string" || name.trim() === "") {
            throw new AppError(200, "Invalid book name.");
        }
        if (category !== null && category !== undefined) {
            if (typeof category !== 'string' || category.trim() === '') {
                throw new AppError(400, "Invalid book category.");
            }
        }
        const lowerCaseName = name.toLowerCase();
        const bookFound = booksDatabase.find((book) => book.name.toLowerCase() === lowerCaseName);
        if(bookFound) {
            throw new AppError(409, "Book already registered.");
        };
        return next();
    };
};



   