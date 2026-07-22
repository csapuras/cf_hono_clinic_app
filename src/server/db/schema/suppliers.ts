import { sqliteTable, text, integer, check } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const supplier = sqliteTable(
  "supplier",
  {
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
    contact: text("contact").notNull(),
    email: text("email").notNull().unique(),
    details: text("details").notNull(),
  },
  (table) => [check("email", sql`${table.email} LIKE '%@%.%'`)],
);

export type NewSupplier = typeof supplier.$inferInsert;
