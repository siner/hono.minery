import {
  Warehouses,
  Products,
  Delivery,
  Route,
  Deliveries,
  Routes,
} from "./types";

export const warehouses = [
  {
    id: "1",
    name: "Warehouse 1",
    lat: "34.0522",
    lon: "118.2437",
  },
  {
    id: "2",
    name: "Warehouse 2",
    lat: "34.2522",
    lon: "118.4437",
  },
] as Warehouses;

export const products = [
  {
    id: "1",
    name: "Product 1",
    warehouse_ids: ["1"],
  },
  {
    id: "2",
    name: "Product 2",
    warehouse_ids: ["1", "2"],
  },
  {
    id: "3",
    name: "Product 3",
    warehouse_ids: ["2"],
  },
  {
    id: "4",
    name: "Product 4",
    warehouse_ids: [],
  },
] as Products;

export const deliveries = [] as Deliveries;
export const routes = [] as Routes;
