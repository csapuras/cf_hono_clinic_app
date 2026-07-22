import {
  sqliteTable,
  text,
  integer,
  check,
} from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const product = sqliteTable("product", {
  id: integer("id").primaryKey(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(new Date()),
  createdBy: integer("created_by").notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .default(new Date()),
  updatedBy: integer("updated_by").notNull(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: text("price").notNull(),
  category: text("category", { mode: "json" }).$type<string[]>().default([]),
  attributes: text("attributes", { mode: "json" })
    .$type<string[]>()
    .default([]),
  // TODO: array of atttributes
});

export type NewProduct = typeof product.$inferInsert;
