import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => c.json("persons"));

export default app;
