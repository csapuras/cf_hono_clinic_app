import { sqliteTable, text, integer, check } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

import { patient } from "./patients";
import { employee } from "./employees";

export const appointment = sqliteTable("appointment", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(new Date()),
  createdBy: integer("created_by").notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .default(new Date()),
  updatedBy: integer("updated_by").notNull(),
  patient: integer("patient_id")
    .notNull()
    .references(() => patient.id, { onDelete: "cascade" }),
  appointmentDate: integer("appointment_date", { mode: "timestamp" }),
  details: text("details"),
  physician: integer("physician_id")
    .notNull()
    .references(() => employee.id, { onDelete: "cascade" }),
  type: text("type").notNull().default("walk-in"),
  status: text("status").notNull().default("pending"),
  referralDetails: text("referral_details"),
});

export type NewAppointment = typeof appointment.$inferInsert;
