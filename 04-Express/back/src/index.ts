import express from "express";
import path from "path";
import url from "url";
import { connect, ensureMongoDBURI } from "#core/constants/index.js";
import {
  logErrorRequestMiddleware,
  logRequestMiddleware,
} from "#common/middlewares/logger.middlewares.js";
import { createRestApiServer } from "#core/servers/index.js";
import { envConstants } from "#core/constants/env.constants.js";
import { booksAPI } from "./pods/book/index.js";
import { securityAPI } from "./pods/security/security.rest-api.js";

const restApiServer = createRestApiServer();

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
restApiServer.use(
  "/",
  express.static(path.resolve(__dirname, envConstants.STATIC_FILES_PATH))
);

restApiServer.use(logRequestMiddleware);

restApiServer.use("/api/security", securityAPI);
restApiServer.use("/api/books", booksAPI);

restApiServer.use(logErrorRequestMiddleware);

restApiServer.listen(envConstants.PORT, async () => {
  if (envConstants.isApiMock) {
    console.log("Running Api Mock");
  } else {
    try {
      await connect(ensureMongoDBURI(envConstants.MONGODB_URI));
      console.log("Connected to DB");
    } catch (error) {
      console.error(
        "Error connecting to MongoDB or inserting document:",
        error
      );
    }
  }
  console.log(`Server is running on port ${envConstants.PORT}`);
});
