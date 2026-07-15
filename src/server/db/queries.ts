import { D1Database } from "@cloudflare/workers-types";
import { getDB } from "./db";
import type { NewPerson } from "./schema";
import * as schema from "./schema";

export const insertPerson = async (
  d1Database: D1Database,
  NewPerson: NewPerson,
) => {
  const db = getDB(d1Database);
  const [result] = await db
    .insert(schema.persons)
    .values(NewPerson)
    .returning();

  return result;
};
