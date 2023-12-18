import { NextFunction, Request, Response } from "express";
import { AppError } from "./AppErros";

export class GlobalErros {
    handleErrors = (
        err: Error,
        req: Request,
        res: Response,
        next: NextFunction
    ): Response => {
        if (err instanceof AppError) {
            return res.status(err.statusCode).json({ error: err.message });
        }

        console.log(err);

        return res.status(500).json({ error: "Internal server error." });
    };
}