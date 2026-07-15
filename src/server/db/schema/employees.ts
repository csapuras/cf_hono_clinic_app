import {
  sqliteTable,
  text,
  integer,
  check,
  boolean,
} from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";
import { positions } from "./positions";
import { persons } from "./persons";

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
  isActive: boolean("is_active").notNull().default(true),
  position: integer("position_id")
    .notNull()
    .references(() => positions.id, { onDelete: "cascade" }),
  person: integer("person_id")
    .notNull()
    .references(() => persons.id, { onDelete: "cascade" }),
});

export type NewEmployee = typeof employee.$inferInsert;
