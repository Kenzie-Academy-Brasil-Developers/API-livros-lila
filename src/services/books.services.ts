// import { undefined } from "zod";
import { booksDatabase } from "../database/database";
import { TBook, TCreateBookType, TEditBookType} from "../interfaces/books.intefaces";

export class BookServices {
    private id = 1
    
    createBook = (data: TCreateBookType): TBook => {
        const newBook: TBook = {
            id: this.id++,
            name: data.name !== undefined ? data.name: '',
            pages: data.pages !== undefined ? data.pages: 0,
            category: data.category !== undefined ? data.category: null,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        booksDatabase.push(newBook);
        return newBook;
    };

    //  createBook = (req: Request, res: Response): Response => {
    //     const response = this.bookService.createBook(req.body);       
    //     return res.status(201).json(response);
    // } 
    
    getBooks = (searchTerm: string) => {
        if(searchTerm){
            return booksDatabase.filter((book) => book.name.toLowerCase().includes(searchTerm.toLowerCase()));
        }
        return booksDatabase;

    };

    getSingleBook = (id: number): TBook | undefined => {
        return booksDatabase.find((book) => book.id === id);
    };

    updateBook = (id: number, data: TEditBookType): TBook | undefined => {
        const bookIndex = booksDatabase.findIndex(book => book.id === id);
        if (isNaN(id) || id <= 0 || bookIndex === -1) {
            return undefined;  
        }

       const updatedBook: TBook = {
            ...booksDatabase[bookIndex],
            ...data,
            updatedAt: new Date(),
       }
       booksDatabase[bookIndex] = updatedBook;
       const updatedBookIndex = booksDatabase.findIndex(book => book.id === id);
       if (updatedBookIndex !== -1) {
            const retrievedUpdatedBook = booksDatabase[updatedBookIndex];
            return retrievedUpdatedBook;
       }else{
           return undefined;
       }
    };

    deleteBook = (name: string): void => {
        const booksIndex = booksDatabase.findIndex((book) => book.name === name); 
        if (booksIndex !== -1) {
            booksDatabase.splice(booksIndex, 1);
        } else {
            throw new Error (`Book with ID ${name} not found`);
        }
    };
    bookService: any;

    editBook(id: number, data: TEditBookType): TBook | undefined {
        const bookIndex = booksDatabase.findIndex(book => book.id === id);
        if (bookIndex === -1) {
            return undefined;
        }
        const updatedBook: TBook = {
            ...booksDatabase[bookIndex],
            ...data,
            updatedAt: new Date(),
        }
        booksDatabase[bookIndex] = updatedBook;
        return updatedBook;
    };
};


