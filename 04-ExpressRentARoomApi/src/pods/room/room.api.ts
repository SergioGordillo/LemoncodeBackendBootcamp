import { Router } from "express";
import { roomMockRepository } from "#dals/index.js";
import { mapRoomFromModelToApi } from "./room.mappers.js";

export const roomApi = Router();

roomApi.get("/", async (req, res, next) => {
  try {
    const page = Number(req.query.page);
    const pageSize = Number(req.query.pageSize);
    const roomList = await roomMockRepository.getRoomList(page, pageSize);
    res.send({
      data: roomList.map((room) => mapRoomFromModelToApi(room)),
    });
  } catch (error) {
    next(error);
  }
});
