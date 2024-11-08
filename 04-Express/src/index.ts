import express from "express";
import { booksAPI } from "./books.api.js";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("My web works!!!");
});

app.use("/api/books", booksAPI);

app.listen("3000", () => {
  console.log("Server is running on port 3000");
});
