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
    createdBy: integer("created_by").notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp" })
      .notNull()
      .default(new Date()),
    updatedBy: integer("updated_by").notNull(),
  },
  (table) => [check("email", sql`${table.email} LIKE '%@%.%'`)],
);

export type NewPerson = typeof persons.$inferInsert;
