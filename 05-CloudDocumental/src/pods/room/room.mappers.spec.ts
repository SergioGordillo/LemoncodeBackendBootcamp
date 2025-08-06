import { mapRoomFromModelToApi } from "./room.mappers.js";
import * as model from "#dals/index.js";
import * as apiModel from "./room.api-model.js";

describe("mapRoomFromModelToApi", () => {
  it("should map a Room model to RoomAPIModel correctly", () => {
    // Arrange
    const room: model.Room = {
      _id: "1",
      listing_url: "https://www.airbnb.com/rooms/10006546",
      name: "Ribeira Charming Duplex",
      summary:
        "Fantastic duplex apartment with three bedrooms in historic center.",
      space: "Privileged views of the Douro River and Ribeira square.",
      description:
        "Fantastic duplex apartment with three bedrooms, located in the historic center of Porto.",
      neighborhood_overview: "Close to river, restaurants, and shops.",
      notes: "Narrow streets and staircases nearby.",
      transit: "Metro station 5min walk, bus stop 2min walk.",
      access: "Full apartment access for guests.",
      interaction: "Hosts are available 24/7 via phone.",
      house_rules: "No smoking, no pets, quiet hours after 10pm.",
      property_type: "House",
      room_type: "Entire home/apt",
      bed_type: "Real Bed",
      minimum_nights: "2",
      maximum_nights: "30",
      cancellation_policy: "moderate",
      last_scraped: "2019-02-16T05:00:00.000Z",
      calendar_last_scraped: "2019-02-16T05:00:00.000Z",
      first_review: "2016-01-03T05:00:00.000Z",
      last_review: "2019-01-20T05:00:00.000Z",
      accommodates: 8,
      bedrooms: 3,
      beds: 5,
      number_of_reviews: 51,
      bathrooms: 1,
      amenities: [
        "WiFi",
        "Heating",
        "Kitchen",
        "Washer",
        "Dryer",
        "TV",
        "Smoke alarm",
      ],
      price: 80,
      security_deposit: 200,
      cleaning_fee: 35,
      extra_people: 15,
      guests_included: 6,
      images: {
        thumbnail_url: "https://example.com/thumb1.jpg",
        medium_url: "https://example.com/medium1.jpg",
        picture_url: "https://example.com/pic1.jpg",
        xl_picture_url: "https://example.com/xlpic1.jpg",
      },
      host: {
        host_id: "12345",
        host_url: "https://www.airbnb.com/users/show/12345",
        host_name: "Alice",
        host_location: "Porto",
        host_about: "Experienced host, love meeting new people.",
        host_response_time: "within an hour",
        host_thumbnail_url: "https://example.com/hostthumb1.jpg",
        host_picture_url: "https://example.com/hostpic1.jpg",
        host_neighbourhood: "Downtown Porto",
        host_is_superhost: true,
        host_has_profile_pic: true,
        host_identity_verified: true,
        host_listings_count: 3,
      },
      address: {
        street: "Rua da Ribeira 10",
        suburb: "Ribeira",
        government_area: "Porto",
        market: "Porto Center",
        country: "Portugal",
        country_code: "PT",
        location: {
          type: "Point",
          coordinates: [-8.611, 41.14],
          is_location_exact: true,
        },
      },
      availability: {
        availability_30: 20,
        availability_60: 45,
        availability_90: 70,
        availability_365: 300,
      },
      review_scores: {
        review_scores_accuracy: 9,
        review_scores_cleanliness: 10,
        review_scores_checkin: 9,
        review_scores_communication: 10,
        review_scores_location: 10,
        review_scores_value: 8,
        review_scores_rating: 9,
      },
      reviews: [
        {
          _id: "r1",
          date: "2019-01-10",
          reviewer_id: "u100",
          reviewer_name: "John Doe",
          comments: "Great stay, highly recommend!",
        },
        {
          _id: "r2",
          date: "2019-01-15",
          reviewer_id: "u101",
          reviewer_name: "Jane Smith",
          comments: "Lovely place and very clean.",
        },
      ],
    };

    const expectedRoom: apiModel.RoomAPIModel = {
      _id: "1",
      listing_url: "https://www.airbnb.com/rooms/10006546",
      name: "Ribeira Charming Duplex",
      images: {
        thumbnail_url: "https://example.com/thumb1.jpg",
        medium_url: "https://example.com/medium1.jpg",
        picture_url: "https://example.com/pic1.jpg",
        xl_picture_url: "https://example.com/xlpic1.jpg",
      },
      address: {
        country: "Portugal",
        country_code: "PT",
      },
    };

    // Act
    const result = mapRoomFromModelToApi(room);

    // Assert
    expect(result).toEqual(expectedRoom);
  });
});
