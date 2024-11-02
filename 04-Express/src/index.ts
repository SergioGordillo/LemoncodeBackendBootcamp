import express from "express";
import { getBookList } from "./mock-db.js";

const app = express();

app.get("/", (req, res) => {
  res.send("My web works!!!");
});

app.get("/api/books", async (req, res) => {
  const bookList = await getBookList();
  res.send(bookList);
});

app.listen("3000", () => {
  console.log("Server is running on port 3000");
});
