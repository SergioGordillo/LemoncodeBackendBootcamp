import * as model from "#dals/index.js"; 
import * as apiModel from "./index.js";

export const mapRoomFromModelToApi = (room: model.Room): apiModel.RoomAPIModel => ({
  _id: room._id.toString(),
  listing_url: room.listing_url,
  name: room.name,
  images: {
    thumbnail_url: room.images?.thumbnail_url,
    medium_url: room.images?.medium_url,
    picture_url: room.images?.picture_url,
    xl_picture_url: room.images?.xl_picture_url,
  },
  address: {
    country: room.address.country,
    country_code: room.address.country_code,
  }
});
