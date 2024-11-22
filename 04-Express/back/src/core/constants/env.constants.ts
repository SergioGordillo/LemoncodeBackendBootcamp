import dotenv from "dotenv";

dotenv.config();

export const envConstants = {
  isProduction: process.env.NODE_ENV === "development",
  PORT: process.env.PORT,
  STATIC_FILES_PATH: process.env.STATIC_FILES_PATH || "public",
  CORS_ORIGIN: process.env.CORS_ORIGIN,
  CORS_METHOD: process.env.CORS_METHOD,
  isApiMock: process.env.API_MOCK === "true"
};
