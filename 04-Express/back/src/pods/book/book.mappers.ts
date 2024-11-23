import * as model from "../../dals/index.js";
import * as apiModel from "./book.api-model.js";

export const mapBookFromModelToApi = (book: model.Book): apiModel.Book => ({
  id: book.id,
  title: book.title,
  releaseDate: book.releaseDate?.toISOString(),
  author: book.author,
});

export const mapBookListFromModelToApi = (
  bookList: model.Book[]
): apiModel.Book[] => bookList.map(mapBookFromModelToApi);
