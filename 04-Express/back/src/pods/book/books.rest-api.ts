import { Router, Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { bookRepository } from "../../dals/index.js";
import {
  mapBookFromModelToApi,
  mapBookFromApiToModel,
  mapBookListFromModelToApi,
} from "./book.mappers.js";

export const booksAPI = Router();

booksAPI
  .get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
     
      const secret = "my-secret";

      if (!token) {
        return res.sendStatus(401); 
      }

      jwt.verify(token, secret, async (error, UserSession) => {
        if (UserSession) {
          const page = Number(req?.query?.page);
          const pageSize = Number(req?.query?.pageSize);
          const bookList = await bookRepository.getBookList(page, pageSize);
          res.send(mapBookListFromModelToApi(bookList));
        } else {
          res.sendStatus(401);
        }
      });
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
      if (book) {
        res.send(mapBookFromModelToApi(book));
      } else {
        res.sendStatus(404);
      }
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
      if (await bookRepository.getBook(id)) {
        const book = mapBookFromApiToModel({ ...req.body, id });
        await bookRepository.saveBook(book);
        res.sendStatus(204);
      } else {
        res.sendStatus(404);
      }
    } catch (error) {
      next(error);
    }
  })
  .delete("/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
      const isDeleted = await bookRepository.deleteBook(id);
      res.sendStatus(isDeleted ? 204 : 404);
    } catch (error) {
      next(error);
    }
  });
