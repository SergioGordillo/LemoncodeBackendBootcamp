import dotenv from "dotenv";
import { z } from "zod";
dotenv.config(); //this enables me to load .env
const envSchema = z.object({
    NODE_ENV: z.enum(["development", "production"]).default("development"),
    PORT: z.coerce.number().default(3000),
    STATIC_FILES_PATH: z.string().default("../public"),
    CORS_ORIGIN: z.string(),
    CORS_METHOD: z.string(),
    MONGODB_URI: z.url().optional(),
});
const parsed = envSchema.safeParse(process.env);
if (!parsed.success) {
    console.error("Invalid env vars:", z.treeifyError(parsed.error));
    process.exit(1); // This stop the app if I have an error
}
export const env = parsed.data;
