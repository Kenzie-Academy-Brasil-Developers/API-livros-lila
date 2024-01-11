import { booksDatabase } from "../database/database";
import { Book} from "../interfaces/books.intefaces";

export class BookServices {
    
    createBook = (name: string, pages: number, category: string ): Book => {
        const newBook: Book = {
            name,
            pages,
            category,
        };
    
        booksDatabase.push(newBook);

        return newBook;
    };

    getBooksByName = (name: string): Book[] => {
        const book = this.getBooksByName(name);
        return book;
    };

    getSingleBook = (name: string) => {
        return booksDatabase.find((book) => book.name === name);
    };

    updateBook = (name: string)=> {
        const bookIndex = booksDatabase.findIndex((book) => book.name === name);
        
        if (bookIndex === -1) {
            return undefined;
        }

        return booksDatabase[bookIndex];
    };

    deleteBook = (name: string): void => {
        const booksIndex = booksDatabase.findIndex((book) => book.name === name); 

        if (booksIndex !== -1) {
            booksDatabase.splice(booksIndex, 1);
        } else {
            throw new Error (`Book with ID ${name} not found`);
        }
    };
}




