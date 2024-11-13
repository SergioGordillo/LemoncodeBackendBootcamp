import express from "express";
import path from "path";
import url from "url";
import { booksAPI } from "./books.api.js";

const app = express();
app.use(express.json());

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
app.use(express.static(path.resolve(__dirname, "../public")));

app.use(async (req, res, next) => {
  console.log("show me req.url", req.url);
  next();
});

app.use("/api/books", booksAPI);

app.use(async (error, req, res, next) => {
  console.log(error);
  res.sendStatus(500);
});

app.listen("3000", () => {
  console.log("Server is running on port 3000");
});
