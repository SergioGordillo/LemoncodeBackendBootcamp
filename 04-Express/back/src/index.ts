import express from "express";
import path from "path";
import url from "url";
import {
  connectToDBServer,
  db,
  ensureMongoDBURI,
} from "#core/constants/index.js";
import {
  logErrorRequestMiddleware,
  logRequestMiddleware,
} from "#common/middlewares/logger.middlewares.js";
import { createRestApiServer } from "#core/servers/index.js";
import { envConstants } from "#core/constants/env.constants.js";
import { booksAPI } from "./pods/book/index.js";

const restApiServer = createRestApiServer();

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
restApiServer.use(
  "/",
  express.static(path.resolve(__dirname, envConstants.STATIC_FILES_PATH))
);

restApiServer.use(logRequestMiddleware);

restApiServer.use("/api/books", booksAPI);

restApiServer.use(logErrorRequestMiddleware);

restApiServer.listen(envConstants.PORT, async () => {
  if (envConstants.isApiMock) {
    console.log("Running Api Mock");
  } else {
    console.log("Running MongoDB");
    try {
      await connectToDBServer(ensureMongoDBURI(envConstants.MONGODB_URI));
      const result = await db.collection("books").insertOne({ name: "Book 2" });
    } catch (error) {
      console.error(
        "Error connecting to MongoDB or inserting document:",
        error
      );
    }
  }
  console.log(`Server is running on port ${envConstants.PORT}`);
});
