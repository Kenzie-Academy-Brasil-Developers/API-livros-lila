import { Request, Response } from "express";
import { BookServices } from "../services/books.services";
// import { BookServices } from "../services/books.services";

export class BooksControllers{
  
    createBook = (req: Request, res: Response): Response => {
        const booksService = new BookServices();

        const response = booksService.createBook(req.body);
        
        return res.status(201).json(response);
    } 

    getBooks = (req: Request, res: Response): Response => {
        const name = req.query.name as string;
  
        const allBooks = this.bookService.getBooks(name);
        return res.status(200).json(allBooks);
    }

    getSingleBook = (req: Request, res: Response): Response => {
        const category = req.query.category as string;

        const bookFound = this.bookService.getSingleBook(category);
       
        return res.status(404).json(bookFound); 
    };

    updateBook = (req: Request, res: Response) => {
        try {
            const updatedBook = this.bookService.updateBook(req.body);
            if (updatedBook) {
                return res.status(200).json(updatedBook);
            } else {
                return res.status(404).json({ error: "Book not found."});
            }
        }catch (error) {
            return res.status(404).json({error: "Book not found."});
        }
    };

    deleteBook = (req: Request, res: Response): Response => {
        const bookId = res.locals.booksIndex;
        try {
            this.bookService.deleteBook(bookId);
            return res.status(204).send();
        }catch (error) {
            return res.status(404).json({error: "Book not found."});
        }
    };  
    bookService: any;

    editBook = (req: Request, res: Response): Response => {
        const booksService = new BookServices();

        const response = booksService.editBook(req.body.id, req.body)
        
        return res.status(200).json(response);
    } 
}


