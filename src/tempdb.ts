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
    name: "Minery Warehouse",
    lat: "40.48211238934583",
    lon: "-3.3953204747594925",
  },
  {
    id: "2",
    name: "Amazon Madrid",
    lat: "40.44849746083536",
    lon: "-3.4979811066513986",
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
    warehouse_ids: ["1"],
  },
  {
    id: "4",
    name: "Product 4",
    warehouse_ids: [],
  },
] as Products;

export const deliveries = [
  {
    id: "1",
    product_ids: ["1", "2"],
    lat: "40.452450396685165",
    lon: "-3.4526856854500627",
    delivery_date: "2024-06-18",
  },
  {
    id: "2",
    product_ids: ["3"],
    lat: "40.352910542177796",
    lon: "-3.551728527927928",
    delivery_date: "2024-06-18",
  },
  {
    id: "3",
    product_ids: ["1", "2", "3"],
    lat: "40.352910542177796",
    lon: "-3.551728527927928",
    delivery_date: "2024-06-18",
  },
] as Deliveries;
export const routes = [] as Routes;
