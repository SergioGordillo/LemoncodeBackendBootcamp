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

   addRoomReview: async (roomId: string, reviewerName: string, comments: string): Promise<boolean> => {
    const room = db.rooms.find((r) => r._id === roomId);

    if (!room) return false;

    const newReview = {
      _id: roomId,
      date: new Date().toISOString(),
      reviewer_id: Math.random().toString(36).substring(2, 10),
      reviewer_name: reviewerName,
      comments: comments
    };

    if (!room.reviews) {
      room.reviews = [];
    }

    room.reviews.push(newReview);
    return true;
  },
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