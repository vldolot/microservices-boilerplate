# Notification Service

This service is responsible for handling and sending notifications (e.g., email, SMS, push notifications) to users. It acts as a centralized component for all outgoing communication.

## Architecture & Data Flow

- **TypeScript + Bun:** Fast, modern runtime for all business logic.
- **RabbitMQ:** Consumes user-related events (e.g., user created) from a queue for async notification processing (see `src/index.ts`).
- **Stateless:** Designed for horizontal scaling; no persistent state between restarts.
- **Autonomous Service:** Owns its logic and does not share a database with other services.

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

### Docker

- See `Dockerfile` for multi-stage build and production image details.

## Environment Variables

- `PORT` (default: 3003): HTTP server port
- `RABBITMQ_URL`: Connection string for the RabbitMQ instance

## Message Consumption

- Listens to the `user_created_queue` RabbitMQ queue for user creation events.
- Processes messages and triggers notification logic (see `src/index.ts`).

## Design Decisions & Trade-offs

- **RabbitMQ for async:** Enables decoupled, event-driven notification delivery.
- **Stateless:** Simplifies scaling and reliability.
- **Bun:** Chosen for speed and modern TypeScript support.
- **Complexity:** Requires robust error handling and retry logic for message delivery.

## References

- RabbitMQ: `src/index.ts`
- Docker: `Dockerfile`
- Helm: `../../kubernetes/helm/charts/notification/`