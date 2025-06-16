import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";

if (!process.env.DATABASE_URL) {
  throw new Error("❌ DATABASE_URL is not defined in your environment variables.");
}

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

client.connect();

const db = drizzle(client);

export default db;
