import { D1Database } from "@cloudflare/workers-types";
import { getDB } from "./db";
import type { NewPerson } from "./schema/persons";
import type { NewPosition } from "./schema/positions";
import * as person from "./schema/persons";
import * as position from "./schema/positions";

export const insertPerson = async (
  d1Database: D1Database,
  NewPerson: NewPerson,
) => {
  const db = getDB(d1Database);
  const [result] = await db
    .insert(person.persons)
    .values(NewPerson)
    .returning();

  return result;
};

export const insertPosition = async (
  d1Database: D1Database,
  NewPosition: NewPosition,
) => {
  const db = getDB(d1Database);
  const [result] = await db
    .insert(position.positions)
    .values(NewPosition)
    .returning();

  return result;
};
