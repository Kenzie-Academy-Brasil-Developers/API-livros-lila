import { NextFunction, Request, Response } from "express";
import { AppError } from "./AppErros";
import { AnyZodObject, ZodError } from "zod";
import { RequestSchemasType } from "../interfaces/books.intefaces";
// import { AnyZodObject } from "zod";

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
        } 

        console.log(err);

        return res.status(500).json({ error: "Internal server error." });
        
    };

    validateBody = (schema: RequestSchemasType) => {
        return async (req: Request, res: Response, next: NextFunction) => {

            if(schema.body){
               req.body = await schema.body.parseAsync(req.body); 
            }
            if(schema.query){
                req.query = await schema.query.parseAsync(req.query); 
             }

            return next();   
        }; 
    };
};