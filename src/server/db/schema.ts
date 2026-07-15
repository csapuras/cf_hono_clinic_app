import { sqliteTable, text, integer, check } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const persons = sqliteTable(
  "persons",
  {
    id: integer("id").primaryKey(),
    email: text("email").notNull().unique(),
    createdAt: integer("created_at", { mode: "timestamp" })
      .notNull()
      .default(new Date()),
    updatedAt: integer("updated_at", { mode: "timestamp" })
      .notNull()
      .default(new Date()),
  },
  (table) => [check("email", sql`${table.email} LIKE '%@%.%'`)],
);

export type NewPerson = typeof persons.$inferInsert;
