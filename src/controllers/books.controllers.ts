import { Request, Response } from "express";
// import { BookServices } from "../services/books.services";

export class BooksControllers{
    createBook = (req: Request, res: Response): Response => {
        const newBook = this.bookService.createBook(req.body.name, req.body.pages, req.body.category);
        
        return res.status(201).json(newBook);
    } 

    getBooks = (req: Request, res: Response): Response => {
        const name = req.query.name as string

        if (!name) {
            const allBooks = this.bookService.getAllBooks();
            return res.status(200).json(allBooks);
        }

        const booksByName = this.bookService.getBooksByName(name);

        if (booksByName.length === 0) {
            return res.status(404).json({ message: "Nenhum livro eocontrado com o nome fornecido."});
        }

        return res.status(200).json(booksByName);
    }

    getSingleBook = (req: Request, res: Response): Response => {
        const bookId = Number(req.params.id);
        const bookFound = this.bookService.getSingleBook(bookId);

        if (bookFound) {
            return res.status(200).json(bookFound);
        } else {
            return res.status(404).json({ error: "Book not found." });
        }
    };

    updateBook = (req: Request, res: Response) => {
        const bookId = Number(req.params.id);

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
}


