# Microservices Boilerplate

This repository provides a comprehensive boilerplate for building and deploying scalable microservices using TypeScript, Bun, Docker, Kubernetes, and modern DevOps tooling. It is designed for rapid prototyping and production-grade deployments.

## Features

- **Polyglot Microservices:** Example services for `user`, `product`, and `notification` domains, each autonomous and owning its data.
- **Modern Runtime:** All services use TypeScript and Bun for fast, type-safe execution.
- **Service Communication:**
  - **gRPC** for synchronous service-to-service calls (see `shared/proto/`).
  - **RabbitMQ** for asynchronous event-driven messaging (notably between `user` and `notification`).
- **API Gateway:** Kong manages all external traffic (see `kubernetes/kong/kong.yml`).
- **Containerization:** Docker and Docker Compose for local development.
- **Orchestration:** Kubernetes with Helm charts for each service (`kubernetes/helm/charts/`).
- **GitOps & CI/CD:** ArgoCD for deployment (`kubernetes/argocd/`), GitHub Actions for CI.
- **Monitoring:** Prometheus and Grafana (see `monitoring/`).

## Prerequisites

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Bun](https://bun.sh/docs/installation)
- [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/)
- [Helm](https://helm.sh/docs/intro/install/)

## Getting Started

1. **Clone the repository:**

   ```sh
   git clone https://github.com/vldolot/microservices-boilerplate.git
   cd microservices-boilerplate
   ```

2. **Install dependencies for each service:**

   ```sh
   cd services/<service_name> && bun install
   ```

## Running Locally

Start the entire stack with Docker Compose:

```sh
docker-compose up -d
```

This launches all services, Prometheus, Grafana, Kong, and RabbitMQ.

### Accessing Services

- **Kong (API Gateway):**
  - Proxy HTTP: `http://localhost:8000`
  - Proxy HTTPS: `https://localhost:8443`
  - Admin HTTP: `http://localhost:8001`
  - Admin HTTPS: `https://localhost:8444`
- **Users Service:**
  - HTTP: `http://localhost:3000`
  - gRPC: `localhost:50051`
- **Product Service:**
  - HTTP: `http://localhost:3002`
- **Notification Service:**
  - No direct HTTP API by default; consumes RabbitMQ events
- **Prometheus:** `http://localhost:9090`
- **Grafana:** `http://localhost:3001`
- **RabbitMQ:**
  - AMQP: `localhost:5672`
  - Management UI: `http://localhost:15672` (user/pass: `guest`/`guest`)

## Running on Cloud/Production

1. **Build and Push Docker Images:**
   For each service in `services/`, build and push Docker images to your registry.
2. **Configure Helm:**
   Update `values.yaml` in each service's Helm chart with your image repository and tag.
3. **Deploy with Helm and ArgoCD:**
   Use `kubernetes/argocd/application.yaml` and Helm charts for GitOps-based deployment.

## Project Structure

```
.
├── docker-compose.yml          # Local development setup
├── .github/                    # GitHub Actions workflows
├── kubernetes/                 # Kubernetes configurations
│   ├── argocd/                 # ArgoCD application setup
│   ├── helm/                   # Helm charts for services
│   └── kong/                   # Kong API Gateway configuration
├── monitoring/                 # Monitoring setup
│   ├── grafana-datasources.yml # Grafana datasource configuration
│   └── prometheus.yml          # Prometheus scrape configuration
├── shared/                     # Shared code and protocol definitions
│   └── proto/                  # gRPC .proto files and generated TypeScript code
└── services/                   # Microservices source code
│   ├── notification/           # Notification service (RabbitMQ consumer)
│   ├── product/                # Product service
│   └── user/                   # User service (gRPC + RabbitMQ producer)
```

## Key Workflows

- **Local development:**
  - Use `bun install` in each service directory.
  - Start all services with `docker-compose up -d`.
  - Run/test individual services with `bun run start` in `services/<name>`.
- **Protobuf/gRPC:**
  - Edit `.proto` files in `shared/proto/`.
  - Regenerate TypeScript code in `shared/proto/generated/` (see service READMEs).
- **Kubernetes deployment:**
  - Use Helm charts in `kubernetes/helm/charts/`.
  - Scripts in `scripts/` automate Kind cluster setup and ArgoCD bootstrapping.

## References

- Service-specific details: see `services/<name>/README.md`
- Helm charts: `kubernetes/helm/charts/<service>/`
- Monitoring: `monitoring/`
- API Gateway: `kubernetes/kong/kong.yml`

---

For more, see each service's README.
