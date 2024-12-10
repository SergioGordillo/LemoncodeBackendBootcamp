import { db } from "#core/servers/index.js";
import { BookRepository } from "./book.repository.js";
import { Book } from "../book.model.js";

export const dbRepository: BookRepository = {
  getBookList: async (page?: number, pageSize?: number) => {
    const effectivePage = page ?? 1;
    const effectivePageSize = pageSize ?? 10;
    const skip = Boolean(page) ? (effectivePage - 1) * effectivePageSize : 0;
    const limit = pageSize ?? 0;
    return await db
      .collection<Book>("books")
      .find()
      .skip(skip)
      .limit(limit)
      .toArray();
  },
  getBook: async (id: string) => {
    throw new Error("Not implemented");
  },
  saveBook: async (book: Book): Promise<Book> => {
    const result = await db.collection<Book>("books").findOneAndUpdate(
      {
        _id: book._id,
      },
      {
        $set: book,
      },
      {
        upsert: true,
        returnDocument: "after",
      }
    );

    if (!result) {
      throw new Error("Error saving or updating the book");
    }
    return result;
  },
  deleteBook: async (id: string) => {
    throw new Error("Not implemented");
  },
};
