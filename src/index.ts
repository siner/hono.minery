import { Hono } from "hono";
import { Warehouse, Warehouses } from "./types";
import { warehouses } from "./tempdb";

const app = new Hono();

app.get("/warehouses", (c) => {
  return c.json(warehouses);
});

app.get("/warehouses/:id", (c) => {
  const warehouse = warehouses.find((w) => w.id === c.req.param("id"));
  if (!warehouse) {
    return c.json({ message: "Warehouse not found" }, 404);
  }
  return c.json(warehouse);
});

app.post("/warehouses", async (c) => {
  const body = await c.req.json();
  if (body instanceof Error) {
    return c.json({ message: "Invalid request body" }, 400);
  }
  const warehouse = body as Warehouse;
  if (!warehouse.name || !warehouse.lat || !warehouse.lon) {
    return c.json({ message: "Missing required fields" }, 400);
  }
  warehouse.id = Math.random().toString(36).substr(2, 9);
  warehouses.push(warehouse);
  return c.json(warehouse, 201);
});

export default app;
