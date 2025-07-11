# Users Service

This service manages user accounts, authentication, authorization, and user profiles. It is a core dependency for other services in the microservices-boilerplate.

## Architecture & Data Flow

-   **TypeScript + Bun:** Fast, modern runtime for all business logic.
-   **gRPC:** Exposes a `GetUser` RPC (see `shared/proto/users/users.proto`, `src/grpc.ts`) for synchronous user data access by other services.
-   **RabbitMQ:** Publishes user-related events (e.g., user created) for async processing by services like `notification` (see `src/rabbitmq.ts`).
-   **REST/GraphQL:** HTTP API via [Elysia](https://elysiajs.com/) with REST, WebSocket, and GraphQL endpoints (see `src/index.ts`).
-   **Autonomous Data:** Owns and manages its user data; does not share database with other services.

## How to Use / Run

### Local Development

1.  Install dependencies:
    ```sh
    bun install
    ```
2.  Start the service:
    ```sh
    bun run start
    ```
    (Runs `src/index.ts` with Bun; see `package.json`.)
3.  For the full stack, run from project root:
    ```sh
    docker-compose up -d
    ```

### Build & Test

-   Lint: `bun run lint`
-   Test: `bun run test` (@TODO)
-   gRPC codegen (after editing `.proto`):
    ```sh
    cd shared && bun run proto:gen
    ```

### Docker

-   See `Dockerfile` for multi-stage build and production image details.

## Environment Variables

-   `PORT` (default: 3000): HTTP server port
-   `RABBITMQ_URL`: RabbitMQ connection string (default: `amqp://guest:guest@rabbitmq:5672`)

## API Endpoints

### HTTP (Elysia)

-   `GET /` — Hello World
-   `GET /health` — Health check
-   `GET /metrics` — Service metrics
-   `POST /users/create` — Create a user (publishes to RabbitMQ)
-   `WS /ws` — WebSocket echo
-   GraphQL endpoint at `/graphql` (Apollo)

### gRPC

-   `GetUser(UserRequest) -> UserResponse` (see `shared/proto/users/users.proto`)

## Design Decisions & Trade-offs

-   **gRPC for sync, RabbitMQ for async:** Enables both real-time and event-driven flows.
-   **Bun:** Chosen for speed and modern TypeScript support.
-   **Elysia:** Lightweight, supports REST, GraphQL, and WebSocket in one server.
-   **Autonomous service:** No shared DB; all communication via APIs or events.
-   **Complexity:** Managing both gRPC and RabbitMQ adds operational overhead.

## References

-   gRPC: `src/grpc.ts`, `shared/proto/users/users.proto`
-   RabbitMQ: `src/rabbitmq.ts`
-   HTTP/GraphQL: `src/index.ts`
-   Docker: `Dockerfile`
-   Helm: `../../kubernetes/helm/charts/user/`
