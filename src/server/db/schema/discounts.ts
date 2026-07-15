import { sqliteTable, text, integer, check } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const discount = sqliteTable("discount", {
  id: integer("id").primaryKey(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(new Date()),
  createdBy: integer("created_by").notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .default(new Date()),
  updatedBy: integer("updated_by").notNull(),
  name: text("name").notNull().unique(),
  description: text("description"),
  value: integer("value").notNull(),
  valueType: text("value_type").notNull().default("value"),
});

export type NewDiscount = typeof discount.$inferInsert;
