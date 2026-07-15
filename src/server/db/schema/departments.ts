import { sqliteTable, text, integer, check } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";
import { employee } from "./employees";

export const department = sqliteTable("department", {
  id: integer("id").primaryKey(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(new Date()),
  createdBy: integer("created_by").notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .default(new Date()),
  updatedBy: integer("updated_by").notNull(),
  title: text("title").notNull().unique(),
  head: integer("head_id")
    .notNull()
    .references(() => employee.id, { onDelete: "cascade" }),
});

export type NewDepartment = typeof department.$inferInsert;
