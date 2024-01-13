import { booksDatabase } from "../database/database";
import { TBook, TCreateBookType, TEditBookType} from "../interfaces/books.intefaces";

export class BookServices {
    private id = 1
    
    createBook = (data: TCreateBookType) => {

        const newBook: TBook = { id: this.id++, ...data, createdAt: new Date(), updatedAt: new Date()};

        booksDatabase.push(newBook);

        return newBook;
    };
    
    getSingleBook = (body: string) => {
        
        return booksDatabase.filter((book) => book.category === body);
    };

    getBooks = (query: string) => {

        return booksDatabase.filter((book) => book.name === query);
    };

    updateBook = (currentName: string)=> {
        const bookIndex = booksDatabase.findIndex((book) => book.name === currentName);
        
        if (bookIndex === -1) {

            return bookIndex;
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

    editBook(id: number, data: TEditBookType){
        const bookIndex = booksDatabase.findIndex(book => book.id === Number(id));

        if (bookIndex === -1) {
            return undefined;
        }

        const updatedBook: TBook = {
            ...booksDatabase[bookIndex],
            ...data,
        }

        booksDatabase.splice(bookIndex, 1, updatedBook);

        return updatedBook;
    };
};


