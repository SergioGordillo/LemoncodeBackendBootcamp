import { ObjectId } from "mongodb";
import { BookRepository } from "./book.repository.js";
import { Book } from "../book.model.js";
import { getBookContext } from "../book.context.js";

export const dbRepository: BookRepository = {
  getBookList: async (page?: number, pageSize?: number) => {
    const effectivePage = page ?? 1;
    const effectivePageSize = pageSize ?? 10;
    const skip = Boolean(page) ? (effectivePage - 1) * effectivePageSize : 0;
    const limit = pageSize ?? 0;
    return await getBookContext().find().skip(skip).limit(limit).toArray();
  },
  getBook: async (id: string) => {
    return await getBookContext().findOne({
      _id: new ObjectId(id),
    });
  },
  saveBook: async (book: Book): Promise<Book> => {
    const result = await getBookContext().findOneAndUpdate(
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
    const { deletedCount } = await getBookContext().deleteOne({
      _id: new ObjectId(id),
    });
    return deletedCount === 1;
  },
};
