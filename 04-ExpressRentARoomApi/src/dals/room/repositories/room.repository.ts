import { Room } from "../room.model.js";

export interface RoomRepository {
  getRoomList: (page?: number, pageSize?: number) => Promise<Room[]>;
  getRoom: (id: string) => Promise<Room | undefined>;
  addRoomReview: (roomId: string, reviewerName: string, comments: string) => Promise<boolean>
}