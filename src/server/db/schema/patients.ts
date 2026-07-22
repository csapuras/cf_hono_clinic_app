import { sqliteTable, text, integer, check } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";
import { person } from "./persons";

type ExpectedItem = {
  description: string;
  start_date: number | string;
  end_date: number | string;
};

export const patient = sqliteTable("patient", {
  id: integer("id").primaryKey(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(new Date()),
  createdBy: integer("created_by").notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .default(new Date()),
  updatedBy: integer("updated_by").notNull(),
  person: integer("person_id")
    .notNull()
    .references(() => person.id, { onDelete: "cascade" }),
  medications: text("medications", { mode: "json" })
    .notNull()
    .$type<ExpectedItem[]>()
    .default(sql`(json_array())`),
  allergies: text("allergies", { mode: "json" })
    .notNull()
    .$type<ExpectedItem[]>()
    .default(sql`(json_array())`),
  medicalHistory: text("medical_history", { mode: "json" })
    .notNull()
    .$type<ExpectedItem[]>()
    .default(sql`(json_array())`),
  familyHistory: text("family_history", { mode: "json" })
    .notNull()
    .$type<ExpectedItem[]>()
    .default(sql`(json_array())`),
  // TODO: array of appointments
});

export type NewPatient = typeof patient.$inferInsert;
