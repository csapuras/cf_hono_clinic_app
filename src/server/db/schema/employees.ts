import { sqliteTable, text, integer, check } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";
import { position } from "./positions";
import { person } from "./persons";

export const employee = sqliteTable("employee", {
  id: integer("id").primaryKey(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(new Date()),
  createdBy: integer("created_by").notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .default(new Date()),
  updatedBy: integer("updated_by").notNull(),
  hireDate: integer("hire_date").notNull(),
  salary: integer("salary").notNull().default(0),
  isActive: integer("is_active", { mode: "boolean" }).notNull().default(true),
  position: integer("position_id")
    .notNull()
    .references(() => position.id, { onDelete: "cascade" }),
  person: integer("person_id")
    .notNull()
    .references(() => person.id, { onDelete: "cascade" }),
});

export type NewEmployee = typeof employee.$inferInsert;
