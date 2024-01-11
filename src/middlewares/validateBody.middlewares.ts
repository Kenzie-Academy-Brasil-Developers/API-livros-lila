import { NextFunction, Request, Response } from "express";
import { RequestSchemas } from "../interfaces/books.intefaces";

export class ValidateBody {
    static execute(schemas: RequestSchemas){
        return async (req: Request, res: Response, next: NextFunction) => {
            
            if (schemas.body){
                req.body = await schemas.body.parseAsync(req.body)
            };    

            if(schemas.query){
                req.query = await schemas.query.parseAsync(req.query.search)
            };

            return next();
        }; 
    };
}