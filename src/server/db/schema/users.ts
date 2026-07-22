import { sqliteTable, text, integer, check } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";
import { employee } from "./employees";
import { access } from "./accesses";

export const user = sqliteTable("user", {
  id: integer("id").primaryKey(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(new Date()),
  createdBy: integer("created_by").notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .default(new Date()),
  updatedBy: integer("updated_by").notNull(),
  employee: integer("employee_id")
    .notNull()
    .references(() => employee.id, { onDelete: "cascade" }),
  access: integer("access_id")
    .notNull()
    .references(() => access.id, { onDelete: "cascade" }),
});

export type NewUser = typeof user.$inferInsert;
