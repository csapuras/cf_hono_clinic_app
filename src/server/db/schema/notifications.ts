import { sqliteTable, text, integer, check } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";
import { appointment } from "./appointments";

export const notification = sqliteTable("notification", {
  id: integer("id").primaryKey(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(new Date()),
  createdBy: integer("created_by").notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .default(new Date()),
  updatedBy: integer("updated_by").notNull(),
  appointment: integer("appointment_id")
    .notNull()
    .references(() => appointment.id, { onDelete: "cascade" }),
  subject: text("subject").notNull(),
  to: text("to").notNull(),
  text: text("text").notNull(),
  html: text("html").notNull(),
  status: text("status", { enum: ["pending", "sent", "failed"] })
    .notNull()
    .default("pending"),
  type: text("type", { enum: ["email", "sms"] })
    .notNull()
    .default("email"),
  scheduledDate: integer("scheduled_date", { mode: "timestamp" })
    .notNull()
    .default(new Date()),
  sentDate: integer("sent_date", { mode: "timestamp" }),
});

export type NewNotification = typeof notification.$inferInsert;
