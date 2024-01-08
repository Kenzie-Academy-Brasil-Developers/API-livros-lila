import "express-async-errors";
import express, { json } from "express";
import { booksRouter } from "./routes/books.routes";
import { GlobalErros } from "./errors/GlobalErrors";
import helmet from "helmet";

export const app = express();
app.use(helmet());
app.use(json());

const globalErrors = new GlobalErros();

app.use("/books", booksRouter);

app.use(globalErrors.handleErrors);


