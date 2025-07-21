import express from "express";
import path from "node:path";
import url from "url";
import { createRestApiServer } from "#core/servers/index.js";
import { envConstants } from "#core/constants/index.js";
import { roomApi } from "./pods/room/room.api.js";
import { env } from "#core/index.js";

const app = createRestApiServer();
const __dirname = path.dirname(url.fileURLToPath(import.meta.url)); // dirname -> src
const staticFilesPath = express.static(
  path.resolve(__dirname, envConstants.STATIC_FILES_PATH)
);

app.use("/", staticFilesPath);

app.get("/", (req, res) => {
  console.log("NODE_ENV:", env.NODE_ENV);
  console.log("MONGODB_URI:", env.MONGODB_URI);
  res.send("Hello World");
});

app.use("/api/rooms", roomApi);

app.use(async (error: any, req: any, res: any, next: any) => {
  console.log(error);
  res.sendStatus(500);
});

app.listen(envConstants.PORT, () => {
  console.log(`Server ready at port ${envConstants.PORT}`);
});

/*import {
  logRequestMiddleware,
  logErrorRequestMiddleware,
} from "#common/middlewares/index.js";*/
