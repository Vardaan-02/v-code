import {
  pgTable,
  uuid,
  varchar,
  timestamp,
  boolean,
} from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: uuid().primaryKey().defaultRandom(),
  name: varchar({ length: 255 }).notNull(),
  username: varchar({ length: 255 }).unique().notNull(),
  email: varchar({ length: 255 }).unique().notNull(),
  password: varchar({ length: 255 }).notNull(),
  is_verified: boolean().default(false),
  created_at: timestamp().defaultNow().notNull(),
  locked: boolean().default(false)
});
