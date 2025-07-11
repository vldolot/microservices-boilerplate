# This Dockerfile is for the notification service. It uses a multi-stage build
# to create a lean production image.

# ---- Base stage ----
# Use the official Bun image as a base.
FROM oven/bun:latest AS base
WORKDIR /app

# ---- Dependencies stage ----
# Install all dependencies for the workspace. This layer is cached
# and only rebuilt when package.json or bun.lock files change.
FROM base AS deps
COPY bun.lock package.json ./
COPY shared/package.json ./shared/package.json
COPY services/user/package.json ./services/user/package.json
COPY services/notification/package.json ./services/notification/package.json
COPY services/product/package.json ./services/product/package.json
# Install all dependencies, including devDependencies, which are needed for code generation.
RUN bun install --frozen-lockfile

# ---- Builder stage ----
# Copy the application code and generate protobuf files from the .proto definitions.
FROM deps AS builder
# Copy the entire workspace to ensure all files are available for the build.
COPY . .
WORKDIR /app/shared
RUN bun run proto:gen

# ---- Release stage ----
# Create the final, lean production-ready image.
FROM base AS release
ENV NODE_ENV=production

# Copy the installed dependencies from the 'deps' stage.
COPY --from=deps /app/node_modules ./node_modules
# Copy the root package.json to ensure bun can find the workspace configuration.
COPY package.json .

# Copy the application code for the notification service.
COPY services/notification ./services/notification

# Copy the shared library with the generated files from the builder stage.
COPY --from=builder /app/shared ./shared

# Set the working directory to the notification service folder.
WORKDIR /app/services/notification

USER bun

# Define the command to run the notification service.
CMD ["bun", "run", "start"]