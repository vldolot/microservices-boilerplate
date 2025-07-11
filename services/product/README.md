# Product Service

This service manages product-related information, including product details, inventory, and pricing. It serves as the single source of truth for all product data within the system.

## Architecture & Data Flow

- **TypeScript + Bun:** Fast, modern runtime for all business logic.
- **gRPC:** Consumes the `GetUser` RPC from the Users service (see `shared/proto/users/users.proto`, `src/index.ts`) for synchronous user data access.
- **REST API (Elysia):** Exposes endpoints for product and health queries (see below).
- **Autonomous Data:** Owns and manages its product data; does not share database with other services.

## How to Use / Run

### Local Development

1. Install dependencies:

   ```sh
   bun install
   ```

2. Start the service:

   ```sh
   bun run start
   ```
   (Runs `src/index.ts` with Bun; see `package.json`.)

3. For the full stack, run from project root:

   ```sh
   docker-compose up -d
   ```

### Build & Test

- Lint: `bun run lint`
- Test: `bun run test` (@TODO)
- gRPC codegen (after editing `.proto`):

   ```sh
   cd shared && bun run proto:gen
   ```

### Docker

- See `Dockerfile` for multi-stage build and production image details.

## Environment Variables

- `PORT` (default: 3002): HTTP server port

## API Endpoints

### HTTP (Elysia)

- `GET /products/user/:id` — Fetch user details for a given user ID (calls Users service via gRPC)
- `GET /health` — Health check
- `GET /metrics` — Service metrics

## Design Decisions & Trade-offs

- **gRPC for sync:** Enables efficient, strongly-typed service-to-service calls (e.g., user lookups).
- **Bun:** Chosen for speed and modern TypeScript support.
- **Elysia:** Lightweight, supports REST and metrics in one server.
- **Autonomous service:** No shared DB; all communication via APIs or events.
- **Complexity:** Managing both gRPC and REST adds operational overhead.

## References

- gRPC: `src/index.ts`, `shared/proto/users/users.proto`
- HTTP: `src/index.ts`
- Docker: `Dockerfile`
- Helm: `../../kubernetes/helm/charts/product/`