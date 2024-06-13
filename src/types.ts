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

export type Delivery = {
  id: string;
  product_ids: string[];
  lat: string;
  lon: string;
  delivery_date: string;
};

export type Deliveries = Delivery[];

export type Waypoint = {
  lat: string;
  lon: string;
};

export type Route = {
  delivery_ids: string[];
  route: Waypoint[];
  distance: number;
};

export type Routes = Route[];
