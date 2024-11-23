import { Router } from "express";
import { bookRepository } from "../../dals/index.js";
import { mapBookListFromModelToApi } from "./book.mappers.js";
import { getBook, insertBook, updateBook, deleteBook } from "../../mock-db.js";

export const booksAPI = Router();

booksAPI
  .get("/", async (req, res, next) => {
    try {
      const page = Number(req?.query?.page);
      const pageSize = Number(req?.query?.pageSize);
      let bookList = await bookRepository.getBookList();
      if (page && pageSize) {
        const startIndex = (page - 1) * pageSize;
        const endIndex = Math.min(startIndex + pageSize, bookList.length);
        bookList = bookList.slice(startIndex, endIndex);
      }
      res.send(mapBookListFromModelToApi(bookList));
    } catch (error) {
      next(error);
    }
  })
  .get("/:id", async (req, res) => {
    const { id } = req.params;
    const bookId = Number(id);
    const book = await getBook(bookId);
    res.cookie("my-cookie", "my-token", {
      sameSite: "none",
      secure: true,
    });
    res.send(book);
  })
  .post("/", async (req, res) => {
    const bookRequest = req.body;
    const newBook = await insertBook(bookRequest);
    res.status(201).send(newBook);
  })
  .put("/:id", async (req, res) => {
    const { id } = req.params;
    const bookId = Number(id);
    const updatedBook = req.body;
    await updateBook(bookId, updatedBook);
    res.sendStatus(204);
  })
  .delete("/:id", async (req, res) => {
    const { id } = req.params;
    const bookId = Number(id);
    await deleteBook(bookId);
    res.sendStatus(204);
  });
