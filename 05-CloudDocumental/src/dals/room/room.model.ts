import { ObjectId } from "mongodb";

export interface Room {
  _id: string | ObjectId;
  listing_url: string;
  name: string;
  summary: string;
  space: string;
  description: string;
  neighborhood_overview: string;
  notes: string;
  transit: string;
  access: string;
  interaction: string;
  house_rules: string;
  property_type: string;
  room_type: string;
  bed_type: string;
  minimum_nights: string;
  maximum_nights: string;
  cancellation_policy: string;
  last_scraped: string;
  calendar_last_scraped: string;
  first_review: string;
  last_review: string;
  accommodates: number;
  bedrooms: number;
  beds: number;
  number_of_reviews: number;
  bathrooms: number;

  amenities: string[];

  price: number;
  security_deposit: number;
  cleaning_fee: number;
  extra_people: number;
  guests_included: number;

  images: {
    thumbnail_url?: string;
    medium_url?: string;
    picture_url?: string;
    xl_picture_url?: string;
  };

  host: {
    host_id: string;
    host_url: string;
    host_name: string;
    host_location?: string;
    host_about?: string;
    host_response_time?: string;
    host_thumbnail_url?: string;
    host_picture_url?: string;
    host_neighbourhood?: string;
    host_is_superhost?: boolean;
    host_has_profile_pic?: boolean;
    host_identity_verified?: boolean;
    host_listings_count?: number;
  };

  address: {
    street: string;
    suburb?: string;
    government_area?: string;
    market?: string;
    country: string;
    country_code?: string;
    location: {
      type: string;
      coordinates: [number, number]; // [lng, lat]
      is_location_exact: boolean;
    };
  };

  availability: {
    availability_30: number;
    availability_60: number;
    availability_90: number;
    availability_365: number;
  };

  review_scores: {
    review_scores_accuracy?: number;
    review_scores_cleanliness?: number;
    review_scores_checkin?: number;
    review_scores_communication?: number;
    review_scores_location?: number;
    review_scores_value?: number;
    review_scores_rating?: number;
  };

  reviews: RoomReview[];
}

export interface RoomReview {
  _id?: string | ObjectId;
  date: string | Date;
  reviewer_id: string | ObjectId;
  reviewer_name: string;
  comments: string;
}
