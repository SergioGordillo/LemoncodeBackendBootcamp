import { RequestHandler, ErrorRequestHandler } from "express";

export const logRequestMiddleware: RequestHandler = (async (req, res, next) => {
    console.log("show me req.url", req.url);
    next();
  });

export const logErrorRequestMiddleware: ErrorRequestHandler = async (error, req, res, next) => {
    console.log(error);
    res.sendStatus(500);
  }