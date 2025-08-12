import { ObjectId } from "mongodb";
export const roomMongoRepository = (db) => {
    const collectionName = "listingsAndReviews";
    const getRoomList = async (page, pageSize) => {
        const safePage = page ?? 1;
        const safePageSize = pageSize ?? 10;
        const skip = (safePage - 1) * safePageSize;
        const rooms = await db
            .collection(collectionName)
            .find({})
            .skip(skip)
            .limit(safePageSize)
            .toArray();
        return rooms;
    };
    const getRoom = async (id) => {
        if (!ObjectId.isValid(id)) {
            return undefined;
        }
        const room = await db
            .collection(collectionName)
            .findOne({ _id: new ObjectId(id) });
        return room ?? undefined;
    };
    const addRoomReview = async (roomId, reviewerName, comments) => {
        if (!ObjectId.isValid(roomId))
            return false;
        const review = {
            _id: new ObjectId(),
            date: new Date(),
            reviewer_id: new ObjectId(),
            reviewer_name: reviewerName,
            comments,
        };
        const result = await db
            .collection(collectionName)
            .updateOne({ _id: new ObjectId(roomId) }, { $push: { reviews: review } });
        return result.modifiedCount === 1;
    };
    return {
        getRoomList,
        getRoom,
        addRoomReview,
    };
};
