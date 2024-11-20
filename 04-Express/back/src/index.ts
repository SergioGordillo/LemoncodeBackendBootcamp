import express from "express";
import path from "path";
import url from "url";
import {createRestApiServer} from "./core/servers/index.js"
import { booksAPI } from "./books.api.js";

const restApiServer = createRestApiServer();

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
restApiServer.use(express.static(path.resolve(__dirname, "../public")));

restApiServer.use(async (req, res, next) => {
  console.log("show me req.url", req.url);
  next();
});

restApiServer.use("/api/books", booksAPI);

restApiServer.use(async (error, req, res, next) => {
  console.log(error);
  res.sendStatus(500);
});

restApiServer.listen("3000", () => {
  console.log("Server is running on port 3000");
});
