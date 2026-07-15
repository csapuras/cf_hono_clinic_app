import { sqliteTable, text, integer, check } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const invoice = sqliteTable("invoice", {
  id: integer("id").primaryKey(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(new Date()),
  createdBy: integer("created_by").notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .default(new Date()),
  updatedBy: integer("updated_by").notNull(),
});

export type NewInvoice = typeof invoice.$inferInsert;
