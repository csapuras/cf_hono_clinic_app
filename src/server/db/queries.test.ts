import { it, expect, mock, beforeEach } from "bun:test";
import { insertPerson } from "./queries";
import type { D1Database } from "@cloudflare/workers-types";
import type { NewPerson } from "./schema/persons";
import { getTestDb } from "../../../test/get-test-db";
import { drizzle } from "drizzle-orm/bun-sqlite";
import { reset } from "drizzle-seed";
import * as schema from "./schema/persons";

mock.module("./db.ts", () => {
  return {
    getDB: () => getTestDb(),
  };
});

beforeEach(async () => {
  const db = getTestDb();
  await reset(db, schema);
});

it("inserts a new subscrier into the database", async () => {
  const newSub: NewPerson = { email: "test@test.com" };
  const subscriber = await insertPerson({} as D1Database, newSub);
  expect(subscriber.email).toBe(newSub.email);
  expect(subscriber.id).toBeDefined();
  expect(subscriber.createdAt).toBeDefined();
});

it("throws an error when inserting a duplicate email", async () => {
  const newSub: NewPerson = { email: "test@test.com" };
  await insertPerson({} as D1Database, newSub);
  expect(insertPerson({} as D1Database, newSub)).rejects.toThrow();
});

it("throws an error when trying to insert an invalid email", async () => {
  const newSub: NewPerson = { email: "test@test" };
  expect(insertPerson({} as D1Database, newSub)).rejects.toThrow();
});
