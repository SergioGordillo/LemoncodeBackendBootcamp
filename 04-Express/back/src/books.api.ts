import { Router } from "express";
import {
  getBookList,
  getBook,
  insertBook,
  updateBook,
  deleteBook,
} from "./mock-db.js";

export const booksAPI = Router();

booksAPI
  .get("/", async (req, res, next) => {
    try {
      const bookList = await getBookList();
      res.send(bookList);
    } catch (error) {
      next(error);
    }
  })
  .get("/:id", async (req, res) => {
    const { id } = req.params;
    const bookId = Number(id);
    const book = await getBook(bookId);
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
