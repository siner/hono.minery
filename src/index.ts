import { Hono } from "hono";
import { Warehouse, Product, Route, Delivery, Routes, Waypoint } from "./types";
import { warehouses, products, deliveries, routes } from "./tempdb";
import { calculateRoute } from "./utils";

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

app.get("/deliveries", (c) => {
  return c.json(deliveries);
});

app.post("/deliveries", async (c) => {
  const body = await c.req.json();
  if (body instanceof Error) {
    return c.json({ message: "Invalid request body" }, 400);
  }
  const { product_ids, lat, lon, delivery_date } = body;
  if (!product_ids || !lat || !lon || !delivery_date) {
    return c.json({ message: "Missing required fields" }, 400);
  }
  const delivery: Delivery = {
    product_ids,
    lat,
    lon,
    delivery_date,
    id: Math.random().toString(36).substr(2, 9),
  };
  deliveries.push(delivery);
  return c.json(delivery, 201);
});

app.get("/routes", (c) => {
  return c.json(routes);
});

app.post("/routes", async (c) => {
  const body = await c.req.json();
  if (body instanceof Error) {
    return c.json({ message: "Invalid request body" }, 400);
  }
  const { delivery_ids } = body;
  if (!delivery_ids) {
    return c.json({ message: "Missing required fields" }, 400);
  }

  const newRoute = calculateRoute(delivery_ids);
  routes.push(newRoute);
  return c.json(newRoute, 201);
});

export default app;
