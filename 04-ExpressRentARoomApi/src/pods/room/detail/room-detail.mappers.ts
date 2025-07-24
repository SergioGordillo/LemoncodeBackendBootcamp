import { Room } from "#dals/room/index.js";
import { RoomDetailApiModel } from "./room-detail.api-model.js";

export const mapRoomToRoomDetailApiModel = (room: Room): RoomDetailApiModel => {
  return {
    id: room._id.toString(),
    title: room.name,
    description: room.description,
    picture: room.images.picture_url ?? room.images.medium_url ?? "",
    address: [
      room.address.street,
      room.address.suburb,
      room.address.government_area,
      room.address.country,
    ]
      .filter(Boolean)
      .join(", "),
    bedrooms: room.bedrooms,
    beds: room.beds,
    bathrooms: room.bathrooms,
    reviews: room.reviews
      .slice() // I clone the original array
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) // I sort reviews out from more recent ones to older ones
      .slice(0, 5) // I want the 5 more recent reviews
      .map((r) => ({
        name: r.reviewer_name,
        comment: r.comments,
        date: typeof r.date === "string" ? r.date : r.date.toISOString(),
      })),
  };
};
