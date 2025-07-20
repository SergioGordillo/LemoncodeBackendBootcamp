import { Db, ObjectId } from "mongodb";
import { Room } from "../room.model.js";
import { RoomRepository } from "./room.repository.js";

export const roomMongoRepository = (db: Db): RoomRepository => {
  const collectionName = "listingsAndReviews";

  const getRoomList = async (page?: number, pageSize?: number): Promise<Room[]> => {
    const safePage = page ?? 1;
    const safePageSize = pageSize ?? 10;
    const skip = (safePage - 1) * safePageSize;
    const rooms = await db
      .collection<Room>(collectionName)
      .find({})
      .skip(skip)
      .limit(safePageSize)
      .toArray();
    return rooms;
  };

  const getRoom = async (id: string): Promise<Room | undefined> => {
    if (!ObjectId.isValid(id)) {
      return undefined;
    }
    const room = await db
      .collection<Room>(collectionName)
      .findOne({ _id: new ObjectId(id) });
    return room ?? undefined;
  };

  return {
    getRoomList,
    getRoom,
  };
};

