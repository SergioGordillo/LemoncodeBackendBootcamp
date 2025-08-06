export interface RoomAPIModel {
  _id: string;
  listing_url: string;
  name: string;
  images: {
    thumbnail_url?: string;
    medium_url?: string;
    picture_url?: string;
    xl_picture_url?: string;
  };
  address: {
    country: string;
    country_code?: string;
  };
}

export interface ListRoomAPIModel {
  data: RoomAPIModel[];
}



