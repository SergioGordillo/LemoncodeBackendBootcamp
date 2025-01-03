import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import {envConstants} from "../constants/index.js"

export const createRestApiServer = () => {
    const restApiServer = express();
    restApiServer.use(express.json());
    restApiServer.use(express.urlencoded({ extended: true }));
    restApiServer.use(cookieParser());
    restApiServer.use(
    cors({
        methods: envConstants.CORS_METHOD,
        origin: envConstants.CORS_ORIGIN,
        credentials: true,
    })
    );
    return restApiServer;
}