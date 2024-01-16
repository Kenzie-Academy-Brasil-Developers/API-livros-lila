import { Request, Response } from "express";
import { BookServices } from "../services/books.services";
import { TBook, TCreateBookType } from "../interfaces/books.intefaces";
import { booksDatabase } from "../database/database";


export class BooksControllers{
    private bookService = new BookServices();

    createBook = (req: Request, res: Response): Response => {
        const response = this.bookService.createBook(req.body);       
        return res.status(201).json(response);
    } 

    // createBook = (data: TCreateBookType): TBook => {
    //     const existingBook = booksDatabase.find((book) => book.name === data.name);
    //     if (existingBook) {
    //         throw new Error(`Book with the name ${data.name} already exists.`)
    //     }
    //     const newBook: TBook = {
    //         id: this.id++,
    //         name: data.name !== undefined ? data.name: '',
    //         pages: data.pages !== undefined ? data.pages: 0,
    //         category: data.category !== undefined ? data.category: null,
    //         createdAt: new Date(),
    //         updatedAt: new Date(),
    //     };
    //     booksDatabase.push(newBook);
    //     return newBook;
    // };

    getBooks = (req: Request, res: Response): Response => {
        const searcheTerm = req.query.search as string; 
        const filteredBooks = this.bookService.getBooks(searcheTerm);
        return res.status(200).json(filteredBooks);
    }

    getSingleBook = (req: Request, res: Response): Response => {
        const bookId: number = Number(req.params.id);
        const bookFound = this.bookService.getSingleBook(bookId); 
        if (bookFound) {
            return res.status(200).json(bookFound);
        } else {
            return res.status(404).json({ error: "Book not found"});
        }     
    };

    updateBook = (req: Request, res: Response): Response => {
            const bookId: number = Number(req.params.id);
            const updatedBook = this.bookService.updateBook(bookId, req.body);
            if (updatedBook !== undefined) {
                return res.status(200).json(updatedBook);
            } else {
                return res.status(404).json({ error: "Book not found."});
            }
    };

    deleteBook = (_req: Request, res: Response): Response => {
            return res.status(204).send();
    };  

    editBook = (req: Request, res: Response): Response => {
        const bookId: number = Number(req.params.id);
        const response = this.bookService.editBook(bookId, req.body);
        if (response === undefined) {
            return res.status(404).json({ error: "Book not found."});
        }
        return res.status(200).json(response);
    }; 
    id: any;
};


