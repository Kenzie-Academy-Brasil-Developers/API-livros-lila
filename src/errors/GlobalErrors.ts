import { NextFunction, Request, Response } from "express";
import { AppError } from "./AppErros";
import { ZodError } from "zod";
import { AnyZodObject } from "zod";

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
        if (err instanceof ZodError) {
            return res.status(409).json(err)
;        }

        console.log(err);

        return res.status(500).json({ error: "Internal server error." });
    };

}