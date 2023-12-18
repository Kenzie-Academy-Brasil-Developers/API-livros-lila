interface Book {
    owner: any;
    id: number;
    name: string;
    pages: number;
    category?: string;
    createdAt: Date;
    updatedAt: Date;
}

type CreateBook = Pick<Book, "name" | "pages" | "category">;

type UpdateBook = Partial<Omit<CreateBook, "name">>;

export { Book, CreateBook, UpdateBook };