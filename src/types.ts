export type Warehouse = {
  id: string;
  name: string;
  lat: string;
  lon: string;
};

export type Warehouses = Warehouse[];

export type Product = {
  id: string;
  name: string;
  warehouse_ids: string[];
};

export type Products = Product[];
