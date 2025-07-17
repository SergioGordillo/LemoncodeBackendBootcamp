import { db } from "../mock-data.js";
import { Room } from "../room.model.js";
import { RoomRepository } from "./room.repository.js";

export const roomMockRepository: RoomRepository = {
  getRoomList: async (page?: number, pageSize?: number) => {
    const safePage = page ?? 1;
    const safePageSize = pageSize ?? 10;
    return paginateRoomList(db.rooms, safePage, safePageSize);
  },
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