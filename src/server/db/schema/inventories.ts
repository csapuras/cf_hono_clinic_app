import { sqliteTable, text, integer, check } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";
import { product } from "./products";
import { supplier } from "./suppliers";

export const inventory = sqliteTable("inventory", {
  id: integer("id").primaryKey(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(new Date()),
  createdBy: integer("created_by").notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .default(new Date()),
  updatedBy: integer("updated_by").notNull(),
  product: integer("product_id")
    .notNull()
    .references(() => product.id, { onDelete: "cascade" }),
  supplier: integer("supplier_id")
    .notNull()
    .references(() => supplier.id, { onDelete: "cascade" }),
  quantity: integer("salary").notNull().default(0),
});

export type NewInventory = typeof inventory.$inferInsert;
