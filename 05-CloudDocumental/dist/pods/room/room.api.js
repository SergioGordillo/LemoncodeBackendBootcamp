import { Router } from "express";
import { roomMockRepository } from "#dals/index.js";
import { mapRoomFromModelToApi } from "./room.mappers.js";
import { mapRoomToRoomDetailApiModel } from "./detail/room-detail.mappers.js";
import { env, envConstants } from "#core/index.js";
import { roomMongoRepository } from "#dals/room/repositories/room.mongodb-repository.js";
import { MongoClient } from "mongodb";
export const roomApi = Router();
roomApi.get("/", async (req, res, next) => {
    try {
        const page = Number(req.query.page);
        const pageSize = Number(req.query.pageSize);
        if (envConstants.isProduction === "development") {
            const roomList = await roomMockRepository.getRoomList(page, pageSize);
            console.log("roomListMockData", roomList);
            res.send({
                data: roomList.map((room) => mapRoomFromModelToApi(room)),
            });
        }
        else {
            if (!env.MONGODB_URI) {
                throw new Error("MONGODB_URI is not defined");
            }
            const client = new MongoClient(env.MONGODB_URI);
            await client.connect();
            const db = client.db("airbnb");
            const roomList = await roomMongoRepository(db).getRoomList();
            console.log("roomListMongoData", roomList);
            res.send({
                data: roomList.map((room) => mapRoomFromModelToApi(room)),
            });
        }
    }
    catch (error) {
        next(error);
    }
});
roomApi.get("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        if (envConstants.isProduction === "development") {
            const room = await roomMockRepository.getRoom(id);
            if (!room) {
                return res.status(404).send({
                    message: `Room with id ${id} not found.`,
                });
            }
            const roomAPIModel = mapRoomToRoomDetailApiModel(room);
            res.send({ data: roomAPIModel });
        }
        else {
            if (!env.MONGODB_URI) {
                throw new Error("MONGODB_URI is not defined");
            }
            const client = new MongoClient(env.MONGODB_URI);
            await client.connect();
            const db = client.db("airbnb");
            const room = await roomMongoRepository(db).getRoom(id);
            if (!room) {
                return res.status(404).send({
                    message: `Room with id ${id} not found.`,
                });
            }
            const roomAPIModel = mapRoomToRoomDetailApiModel(room);
            res.send({ data: roomAPIModel });
        }
    }
    catch (error) {
        next(error);
    }
});
roomApi.post("/:id/reviews", async (req, res, next) => {
    try {
        const { id } = req.params;
        const { reviewer_name, comments } = req.body;
        if (!reviewer_name || !comments) {
            return res
                .status(400)
                .send({ message: "Missing reviewer_name or comments" });
        }
        if (envConstants.isProduction === "development") {
            const success = await roomMockRepository.addRoomReview(id, reviewer_name, comments);
            if (!success) {
                return res
                    .status(404)
                    .send({ message: `Room with id ${id} not found.` });
            }
            res.status(201).send({ message: "Review added successfully" });
        }
        else {
            if (!env.MONGODB_URI) {
                throw new Error("MONGODB_URI is not defined");
            }
            const client = new MongoClient(env.MONGODB_URI);
            await client.connect();
            const db = client.db("airbnb");
            const success = await roomMongoRepository(db).addRoomReview(id, reviewer_name, comments);
            if (!success) {
                return res
                    .status(404)
                    .send({ message: `Room with id ${id} not found.` });
            }
            res.status(201).send({ message: "Review added successfully" });
        }
    }
    catch (error) {
        next(error);
    }
});
