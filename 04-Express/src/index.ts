import express from "express";
import {
  getBookList,
  getBook,
  insertBook,
  updateBook,
  deleteBook,
} from "./mock-db.js";

const app = express();
app.use(express.json());

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

app.post("/api/books", async (req, res) => {
  const bookRequest = req.body;
  const newBook = await insertBook(bookRequest);
  res.status(201).send(newBook);
});

app.put("/api/books/:id", async (req, res) => {
  const { id } = req.params;
  const bookId = Number(id);
  const updatedBook = req.body;
  await updateBook(bookId, updatedBook);
  res.sendStatus(204);
});

app.delete("/api/books/:id", async (req, res) => {
  const { id } = req.params;
  const bookId = Number(id);
  await deleteBook(bookId);
  res.sendStatus(204);
});

app.listen("3000", () => {
  console.log("Server is running on port 3000");
});
