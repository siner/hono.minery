import { Route, Waypoint } from "./types";
import { deliveries, warehouses, products } from "./tempdb";

function getDistanceFromLatLonInKm(
  lat1: string | undefined,
  lon1: string | undefined,
  lat2: string | undefined,
  lon2: string | undefined
) {
  if (!lat1 || !lon1 || !lat2 || !lon2) {
    return 0;
  }
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(parseFloat(lat2) - parseFloat(lat1)); // deg2rad below
  var dLon = deg2rad(parseFloat(lon2) - parseFloat(lon1));
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(parseFloat(lat1))) *
      Math.cos(deg2rad(parseFloat(lat2))) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg: number) {
  return deg * (Math.PI / 180);
}

export function calculateRoute(delivery_ids: string[]): Route {
  const routeDeliveries = deliveries.filter((d) => delivery_ids.includes(d.id));

  const deliveryWarehouses = routeDeliveries
    .map((d) => {
      return products
        .filter((p) => d.product_ids.includes(p.id))
        .map((p) => warehouses.filter((w) => p.warehouse_ids.includes(w.id)))
        .flat();
    })
    .flat();

  const uniqueWarehouses = Array.from(
    new Set(deliveryWarehouses.map((w) => w.id))
  ).map((id) => deliveryWarehouses.find((w) => w.id === id));

  console.log(uniqueWarehouses);

  const graph = {
    nodes: [...uniqueWarehouses.flat(), ...routeDeliveries],
  };

  const table = graph.nodes.map((d) => {
    const row = graph.nodes.map((o) => {
      return [o, d, getDistanceFromLatLonInKm(o?.lat, o?.lon, d?.lat, d?.lon)];
    });
    return row;
  });

  const shortestPath = [graph.nodes[0], ...graph.nodes, graph.nodes[0]];

  const route: Waypoint[] = shortestPath.map((n) => {
    if (!n) {
      return { lat: "0", lon: "0" };
    }
    return {
      lat: n.lat,
      lon: n.lon,
    };
  });

  const distance = table.reduce((acc, row) => {
    const distances = row.map((r) => r[2]);
    const minDistance = Math.min(
      ...(distances.filter((d) => d !== 0) as number[])
    );
    return acc + minDistance;
  }, 0);

  return {
    delivery_ids,
    route,
    distance,
  };
}
