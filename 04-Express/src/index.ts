import express from "express";
import path from "path";
import url from "url";
import { booksAPI } from "./books.api.js";

const app = express();
app.use(express.json());

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
app.use(express.static(path.resolve(__dirname, "../public")));

app.use("/api/books", booksAPI);

app.listen("3000", () => {
  console.log("Server is running on port 3000");
});
