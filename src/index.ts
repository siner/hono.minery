import { Hono } from "hono";
import { Warehouse, Product } from "./types";
import { warehouses, products } from "./tempdb";

const app = new Hono();

// Warehouses

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
  const { name, lat, lon } = body;
  if (!name || !lat || !lon) {
    return c.json({ message: "Missing required fields" }, 400);
  }
  const warehouse: Warehouse = {
    name,
    lat,
    lon,
    id: Math.random().toString(36).substr(2, 9),
  };
  warehouses.push(warehouse);
  return c.json(warehouse, 201);
});

// Products

app.get("/products", (c) => {
  return c.json(products);
});

app.get("/products/:id", (c) => {
  const product = products.find((p) => p.id === c.req.param("id"));
  if (!product) {
    return c.json({ message: "Product not found" }, 404);
  }
  return c.json(product);
});

app.post("/products", async (c) => {
  const body = await c.req.json();
  if (body instanceof Error) {
    return c.json({ message: "Invalid request body" }, 400);
  }
  const { name, warehouse_ids } = body;
  if (!name || !warehouse_ids) {
    return c.json({ message: "Missing required fields" }, 400);
  }
  const product: Product = {
    name,
    warehouse_ids,
    id: Math.random().toString(36).substr(2, 9),
  };
  products.push(product);
  return c.json(product, 201);
});

export default app;
