import { Router } from "express";
import { Room, roomMockRepository } from "#dals/index.js";
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
      console.log("Entro en desarrollo");
      const roomList = await roomMockRepository.getRoomList(page, pageSize);
      res.send({
        data: roomList.map((room: Room) => mapRoomFromModelToApi(room)),
      });
    } else {
      console.log("Entro en producción");
      if (!env.MONGODB_URI) {
        throw new Error("MONGODB_URI is not defined");
      }
      const client = new MongoClient(env.MONGODB_URI);
      await client.connect();
      const db = client.db("airbnb");
      const roomList = await roomMongoRepository(db).getRoomList();
      res.send({
        data: roomList.map((room: Room) => mapRoomFromModelToApi(room)),
      });
    }
  } catch (error) {
    next(error);
  }
});

roomApi.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const room = await roomMockRepository.getRoom(id);
    if (!room) {
      return res.status(404).send({
        message: `Room with id ${id} not found.`,
      });
    }
    const roomAPIModel = mapRoomToRoomDetailApiModel(room);
    res.send({ data: roomAPIModel });
  } catch (error) {
    next(error);
  }
});
