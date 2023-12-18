import { booksDatabase } from "../database/database";
import { CreateBook, Book, UpdateBook } from "../interfaces/books.intefaces";
import { idGenerate } from "../utils";

export class BookServices {
    createBook = (data: CreateBook): Book => {
        const newBook: Book = {
            id: idGenerate(),
            ...data,
            createdAt: new Date(),
            updatedAt: new Date(),
            owner: undefined
        };

        booksDatabase.push(newBook);

        return newBook;
    };

    getBooks = (): Book[] => {
        return booksDatabase;
    };

    getSingleBook = (id: number): Book | undefined => {
        const book = booksDatabase.find(book => book.id === id);

        return booksDatabase.find(book => book.id === id);
    };

    updateBook = (id: number, data: UpdateBook): Book | undefined=> {
        const bookIndex = booksDatabase.findIndex((book) => book.id === id);
        
        if (bookIndex === -1) {
            return undefined;
        }

        booksDatabase[bookIndex] = {
            ...booksDatabase[bookIndex],
            ...data,
            updatedAt: new Date(),
        };

        return booksDatabase[bookIndex];
    };

    deleteBook = (id: number): void => {
        const booksIndex = booksDatabase.findIndex((book) => book.id === id); 

        if (booksIndex !== -1) {
            booksDatabase.splice(booksIndex, 1);
        } else {
            throw new Error (`Book with ID ${id} not found`);
        }
    };
}



