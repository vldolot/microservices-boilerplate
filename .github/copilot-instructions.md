# Copilot Instructions for microservices-boilerplate

## Project Overview
- **Architecture:** Polyglot microservices (TypeScript + Bun) for `user`, `product`, and `notification` domains, orchestrated via Docker Compose and Kubernetes (Helm charts in `kubernetes/helm/charts/`).
- **Communication:**
  - **gRPC** (see `shared/proto/` and generated code in `shared/proto/generated/`) for synchronous service-to-service calls.
  - **RabbitMQ** for async messaging/events (notably between `user` and `notification`).
  - **Kong** as API gateway (`kubernetes/kong/kong.yml`).
- **CI/CD & GitOps:** ArgoCD for deployment (`kubernetes/argocd/`), GitHub Actions for CI.
- **Monitoring:** Prometheus and Grafana (configs in `monitoring/`).

## Key Workflows
- **Local development:**
  - Install dependencies: `bun install` in each service directory.
  - Start all services: `docker-compose up -d` from project root.
  - Individual service: `bun run start` in `services/<name>`.
- **Kubernetes deployment:**
  - Use Helm charts in `kubernetes/helm/charts/`.
  - Scripts in `scripts/` automate local Kind cluster setup and ArgoCD bootstrapping.
- **Protobuf/gRPC:**
  - Edit `.proto` files in `shared/proto/`.
  - Generate TypeScript code in `shared/proto/generated/` (see service READMEs for details).

## Patterns & Conventions
- **Service boundaries:** Each service is autonomous, owns its data, and communicates via gRPC, RabbitMQ or REST APIs.
- **TypeScript + Bun:** All services use Bun for fast TypeScript execution. Use `bun` CLI for scripts and running services.
- **Environment variables:** Each service documents its required env vars in its README.
- **Helm/K8s:** Each service has a Helm chart (`kubernetes/helm/charts/<service>/`).
- **API Gateway:** Kong routes all external traffic; configure in `kubernetes/kong/kong.yml`.
- **Monitoring:** Prometheus scrapes metrics from services; Grafana dashboards are pre-configured.

## Examples
- **gRPC usage:** See `services/user/src/grpc.ts` and `shared/proto/users/users.proto`.
- **RabbitMQ usage:** See `services/user/src/rabbitmq.ts` and `services/notification/src/index.ts`.
- **Helm chart structure:** See `kubernetes/helm/charts/user/`.
- **Local dev script:** `scripts/1_setup_kind.sh` for Kind cluster setup.

## Tips for AI Agents
- Prefer Bun scripts and TypeScript for new code.
- Follow existing service boundaries and communication patterns.
- Reference service READMEs for environment/config details.
- Use Docker Compose for local integration testing.
- Regenerate gRPC code after editing `.proto` files.
