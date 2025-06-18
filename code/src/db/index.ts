import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";

if (!process.env.DATABASE_URL) {
  throw new Error("❌ DATABASE_URL is not defined in your environment variables.");
}

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

client.connect().catch((err) => {
  console.error("❌ PG connection failed:", err.message);
  process.exit(1);
});

const db = drizzle(client)!;

export default db;
