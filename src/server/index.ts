import { Hono } from "hono";
import { accessAuth } from "./middleware/auth";
import accesses from "./routes/accesses";
import appointments from "./routes/appointments";
import departments from "./routes/departments";
import discounts from "./routes/discounts";
import employees from "./routes/employees";
import invetories from "./routes/invetories";
import invoices from "./routes/invoices";
import notifications from "./routes/notifications";
import patients from "./routes/patients";
import persons from "./routes/persons";
import positions from "./routes/positions";
import products from "./routes/products";
import services from "./routes/services";
import suppliers from "./routes/suppliers";
import users from "./routes/users";

const app = new Hono();

app.use(accessAuth).get("/api/health", (c) => {
  return c.json("Healthy");
});

app.route("/api/accesses", accesses);
app.route("/api/appointments", appointments);
app.route("/api/departments", departments);
app.route("/api/discounts", discounts);
app.route("/api/employees", employees);
app.route("/api/invetories", invetories);
app.route("/api/invoices", invoices);
app.route("/api/notifications", notifications);
app.route("/api/patients", patients);
app.route("/api/persons", persons);
app.route("/api/positions", positions);
app.route("/api/products", products);
app.route("/api/services", services);
app.route("/api/suppliers", suppliers);
app.route("/api/users", users);

export default app;
