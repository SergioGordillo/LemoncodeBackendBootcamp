export interface RoomDetailApiModel {
  id: string;
  title: string;
  description: string;
  picture: string;
  address: string;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  reviews: Array<{
    name: string;
    comment: string;
    date: string;
  }>;
}
