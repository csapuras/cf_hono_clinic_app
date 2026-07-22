import { sqliteTable, text, integer, check } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";
import { appointment } from "./appointments";
import { patient } from "./patients";
import { discount } from "./discounts";

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
  appointment: integer("position_id")
    .notNull()
    .references(() => appointment.id, { onDelete: "cascade" }),
  discount: integer("position_id")
    .notNull()
    .references(() => discount.id, { onDelete: "cascade" }),
});

export type NewInvoice = typeof invoice.$inferInsert;
