import express from "express";
import cors from "cors";
import { envConstants } from "../constants/index.js";

export const createRestApiServer = () => {
  const app = express();
  app.use(express.json());
  app.use(
    cors({
      methods: envConstants.CORS_METHOD,
      origin: envConstants.CORS_ORIGIN,
      credentials: true
    })
  );

  return app;
};