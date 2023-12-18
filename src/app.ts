import express, { json } from "express";
import { booksRouter } from "./routes/books.routes";
import { GlobalErros } from "./errors/errors.middleware";

export const app = express();
const globalErrors = new GlobalErros();

app.use(json());

app.use("/books", booksRouter);

app.use(globalErrors.handleErrors);


