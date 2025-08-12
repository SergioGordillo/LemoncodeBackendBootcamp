import { env } from "#core/load-env.js";
export const envConstants = {
    isProduction: env.NODE_ENV,
    PORT: env.PORT,
    STATIC_FILES_PATH: env.STATIC_FILES_PATH,
    CORS_ORIGIN: env.CORS_ORIGIN,
    CORS_METHOD: env.CORS_METHOD,
    MONGODB_URI: env.MONGODB_URI,
};
