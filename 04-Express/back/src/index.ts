import express from "express";
import path from "path";
import url from "url";
import { createRestApiServer } from "#core/servers/index.js";
import { envConstants } from "#core/constants/env.constants.js";
import { booksAPI } from "./books.api.js";

const restApiServer = createRestApiServer();

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
restApiServer.use(
  "/",
  express.static(path.resolve(__dirname, envConstants.STATIC_FILES_PATH))
);

restApiServer.use(async (req, res, next) => {
  console.log("show me req.url", req.url);
  next();
});

restApiServer.use("/api/books", booksAPI);

restApiServer.use(async (error, req, res, next) => {
  console.log(error);
  res.sendStatus(500);
});

restApiServer.listen(envConstants.PORT, () => {
  console.log(`Server is running on port ${envConstants.PORT}`);
});
