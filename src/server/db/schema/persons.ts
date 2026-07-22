import { sqliteTable, text, integer, check } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const person = sqliteTable(
  "person",
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
    firstName: text("first_name").notNull(),
    middleName: text("middle_name").notNull(),
    lastName: text("last_name").notNull(),
    suffix: text("suffix"),
    address: text("address").notNull(),
    contact: text("contact").notNull(),
    gender: text("gender", { enum: ["male", "female"] }).notNull(),
    birthDate: integer("birth_date", { mode: "timestamp" }).notNull(),
  },
  (table) => [check("email", sql`${table.email} LIKE '%@%.%'`)],
);

export type NewPerson = typeof person.$inferInsert;
