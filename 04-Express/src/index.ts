import express from "express";
import { getBookList, getBook } from "./mock-db.js";

const app = express();

app.get("/", (req, res) => {
  res.send("My web works!!!");
});

app.get("/api/books", async (req, res) => {
  const bookList = await getBookList();
  res.send(bookList);
});

app.get("/api/books/:id", async (req, res) => {
  const { id } = req.params;
  const bookId = Number(id);
  const book = await getBook(bookId);
  res.send(book);
});

app.listen("3000", () => {
  console.log("Server is running on port 3000");
});
