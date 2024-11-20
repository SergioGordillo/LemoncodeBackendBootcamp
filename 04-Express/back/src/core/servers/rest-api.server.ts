import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

export const createRestApiServer = () => {
    const restApiServer = express();
    restApiServer.use(express.json());
    restApiServer.use(cookieParser());
    restApiServer.use(
    cors({
        methods: "GET",
        origin: "http://localhost:8081",
        credentials: true,
    })
    );
    return restApiServer;
}