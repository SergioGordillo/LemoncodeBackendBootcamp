import { BookRepository } from "./book.repository.js";
import { Book } from "../book.model.js";
import { db } from "../../mock-data.js";

const insertBook = async (book: Book) => {
    const id = (db.books.length + 1).toString();
    const newBook = {
      ...book,
      id,
    };
  
    db.books = [...db.books, newBook];
    return newBook;
  };
  
const updateBook = async (book:Book) => {
   db.books = db.books.map((b)=> (b.id===book.id ? {...b, ...book} : b));
   return book;
}

export const mockRepository: BookRepository = {
    getBookList: async() => db.books,
    getBook: async(id: string) => {
        const book = db.books.find(b => b.id === id);
        if (!book) throw new Error(`Book with id ${id} not found`);
        return book;
    },
    saveBook: async (book: Book) => Boolean(book.id) ? updateBook(book) : insertBook(book),
    deleteBook: async(id: string) => {
        db.books = db.books.filter(b=>b.id!==id);
        return true;
    }
}