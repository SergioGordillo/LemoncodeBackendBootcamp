import { Router } from "express";
import { bookRepository } from "../../dals/index.js";
import {
  mapBookFromModelToApi,
  mapBookFromApiToModel,
  mapBookListFromModelToApi,
} from "./book.mappers.js";

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
  .get("/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
      const book = await bookRepository.getBook(id);
      res.cookie("my-cookie", "my-token", {
        sameSite: "none",
        secure: true,
      });
      res.send(mapBookFromModelToApi(book));
    } catch (error) {
      next(error);
    }
  })
  .post("/", async (req, res, next) => {
    try {
      const bookRequest = mapBookFromApiToModel(req.body);
      const newBook = await bookRepository.saveBook(bookRequest);
      res.status(201).send(newBook);
    } catch (error) {
      next(error);
    }
  })
  .put("/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
      const book = mapBookFromApiToModel({ ...req.body, id });
      await bookRepository.saveBook(book);
      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  })
  .delete("/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
      await bookRepository.deleteBook(id);
      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  });
