import { NextFunction, Request, Response } from "express";
import { booksDatabase } from "../database/database";
import { AppError } from "../errors/AppErros";
import { createBookSchema } from "../schemas/createBooksBody.schemas";


export class BookMiddlewares {
    verifyBookId = (req: Request, res: Response, next: NextFunction): void => {
        const bookId = Number(req.params.id);
        const index = booksDatabase.findIndex((book) => book.name);

        if (index === -1) {
            return next(new AppError(404, "Book not found."));
        }
        res.locals.bookId = bookId;

        return next();
    };

    verifyBookRegister = (req: Request, res: Response, next: NextFunction): void => {
        const { id, name, pages, category, owner, createdAt, updatedAt} = req.body;

        try {
            const parseBody = createBookSchema.parse({
                name,
                pages,
                category,  
            });
            req.body = parseBody;
        }catch (error) {
            return next(new AppError(400, "Invalid request body."));
        }

        const bookFound: any = booksDatabase.find((createBook) => (bookFound.name === name && bookFound.owner === owner) || bookFound.id === res.locals.bookId);

        if(bookFound) {
            return next(new AppError(409, "Book already registered."));
        };

        return next();
    };
}