FROM oven/bun:latest AS shared-builder
WORKDIR /app
COPY bun.lock package.json ./
COPY shared ./shared
# Install dependencies and generate proto files
WORKDIR /app/shared
RUN bun install --frozen-lockfile && bun run proto:gen
