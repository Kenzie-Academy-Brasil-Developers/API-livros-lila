import { NextFunction, Request, Response } from "express";
import { booksDatabase } from "../database/database";
import { AppError } from "../errors/AppErros";


export class BookMiddlewares {
    verifyBookId = (req: Request, res: Response, next: NextFunction): void => {
        const bookId = Number(req.params.id);
        const index = booksDatabase.findIndex((book) => book.id === bookId);
    
        if (index === -1) {throw new AppError(404, "Book not found.")}
            return next();
};

verifyBookRegister = (req: Request, res: Response, next: NextFunction): void => {
    const { name } = req.body;

    const bookFound = booksDatabase.find((book) => book.name === name);

    if(bookFound) {
        throw new AppError(409, "Book already registered.");
    };
    return next();
};
};



   