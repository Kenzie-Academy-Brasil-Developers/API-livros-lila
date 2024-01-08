import { number, string } from "zod";
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

    getBooks = (query: string): Book[] => {
        return booksDatabase.filter((book) => book.category === query);
    };

    getSingleBook = (name: string, pages: number, category: string): Book | undefined => {
        return booksDatabase.find((book) => book === book);
    };

    updateBook = (name: string, pages: number, category: string): Book | undefined=> {
        const bookIndex = booksDatabase.findIndex((book) => book === book);
        
        // if (bookIndex === -1) {
        //     return undefined;
        // }

        // booksDatabase[bookIndex] = {
        //     ...booksDatabase[bookIndex],
        //     name: string,
        //     pages: number,
        //     category: string,
        // };

        return booksDatabase[bookIndex];
    };

    deleteBook = (id: number): void => {
        // const booksIndex = booksDatabase.findIndex((book) => book.id === id); 

        // if (booksIndex !== -1) {
        //     booksDatabase.splice(booksIndex, 1);
        // } else {
        //     throw new Error (`Book with ID ${id} not found`);
        // }
    };
}




