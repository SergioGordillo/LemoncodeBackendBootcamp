import { db } from "../mock-data";
import { Room } from "../room.model";
import { RoomRepository } from "./room.repository";

export const roomMockRepository: RoomRepository = {
  getRoomList: async (page?: number, pageSize?: number) =>
    paginateRoomList(db.rooms, page, pageSize),
    getRoom: async (id: string) => db.rooms.find((r) => r._id === id),
};

const paginateRoomList = (
  roomList: Room[],
  page: number,
  pageSize: number
): Room[] => {
  let paginatedRoomList = [...roomList];
  if (page && pageSize) {
    const startIndex = (page - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, paginatedRoomList.length);
    paginatedRoomList = paginatedRoomList.slice(startIndex, endIndex);
  }

  return paginatedRoomList;
};