import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema.js";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL environment variable is not set");
}

const client = postgres(connectionString, {
  max: 5,           // Limit max connections
  idle_timeout: 20, // Close idle connections after 20 seconds
  connect_timeout: 10
});
export const db = drizzle(client, { schema });
