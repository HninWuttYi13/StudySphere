import {z} from "zod";
const envSchema = z.object({
  MONGO_URL: z.string(),
  PORT: z.string(),
  ACCESS_TOKEN_SECRET: z.string(),
  REFRESH_TOKEN_SECRET: z.string(),
  NODE_ENV: z.string()
});
export const env =envSchema.parse(process.env)