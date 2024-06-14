# hono.minery

## Problem tasks

1. Create the initial structure for the project (Languaje selected is Hono, cloud infrastructure is cloudflare workers and database is Cloudflare D1).
2. Definition of the data model.
3. Create the endpoints for the API.

## Estimations

1. 1 hour
2. 2 hours
3. 10 hours

## Considerations

- The project will be deployed via Cloudflare Wrangler on the Cloudflare Workers platform.
- The project will be developed in a monorepo structure.

## How to run the project

1. Clone the repository.
2. Run `npm install` in the root of the project.
3. Run `npm run dev` to run the project locally.
4. Run `npm run deploy` to deploy the project to Cloudflare Workers.

## URL of the deployed project

https://hono-minery.edgefranmoreno.workers.dev/

## How to use the API

The API has the following endpoints for warehouses:

- `GET /warehouses`: Returns all the warehouses.
- `GET /warehouses/:id`: Returns a warehouse by id.
- `POST /warehouses`: Creates a warehouse.
- `PUT /warehouses/:id`: Updates a warehouse by id. (Future work)
- `DELETE /warehouses/:id`: Deletes a warehouse by id. (Future work)

The warehouse model is the following:

```json
{
  "id": "string",
  "name": "string",
  "lat": "float",
  "lon": "float"
}
```

The API has the following endpoints for products:

- `GET /products`: Returns all the products.
- `GET /products/:id`: Returns a product by id.
- `POST /products`: Creates a product.
- `PUT /products/:id`: Updates a product by id. (Future work)
- `DELETE /products/:id`: Deletes a product by id. (Future work)

The product model is the following:

```json
{
  "id": "string",
  "name": "string",
  "warehouse_ids": "string[]"
}
```

The API has the following endpoints for deliveries:

- `POST /deliveries`: Creates a delivery.

The delivery model is the following:

```json
{
  "id": "string",
  "product_ids": "string[]",
  "lat": "float",
  "lon": "float",
  "delivery_date": "string"
}
```

The API has the following endpoints for routes:

- `POST /routes`: Creates a route.

The route model is the following:

```json
{
  "id": "string",
  "delivery_ids": "string[]"
}
```

## Route calculation

There are 2 approaches to calculate the best route for a delivery:

1. The first approach is using the Traveling Salesman Problem (TSP) algorithm to calculate the best route. To implement this approach we are going to do the following steps (using a simplified version of the TSP algorithm):

- Create a graph with the warehouses and the delivery location.
- Calculate the shortest path between the delivery location and the warehouses.
- Calculate the shortest path between the warehouses.
- Calculate the shortest path between the warehouses and the delivery location.

Considerations: This approach is not the best for a large number of warehouses and delivery locations. The complexity of the TSP algorithm is O(n!) and it is not efficient for a large number of nodes. We've used simplified function to calculate distances between points, not the real distance between points using roadmaps.

2. The second approach is using the Google Maps API to calculate the best route.

## Future work

- Implement the update and delete endpoints for warehouses, products and deliveries.
- Implement the update and delete endpoints for routes.
