
import { Elysia } from 'elysia';
import * as grpc from '@grpc/grpc-js';
import { UsersClient } from  '@monorepo/shared/proto';

// Create gRPC client for Users service
const usersClient = new UsersClient('user:50051', grpc.credentials.createInsecure());

const app = new Elysia()
  .get('/products/user/:id', async ({ params }) => {
    console.log(`Received request for user ID: ${params.id}`);
    return new Promise((resolve, reject) => {
      // Call the gRPC service to get user details
      usersClient.getUser({ id: params.id }, (error, response) => {
        if (error) {
          console.error('Error calling gRPC GetUser:', error);
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  })
  // /health endpoint
  .get('/health', () => ({
    status: 'ok',
    timestamp: new Date().toISOString()
  }))
  // /metrics endpoint
  .get('/metrics', () => ({
    uptime: process.uptime(),
    memoryUsage: process.memoryUsage(),
    timestamp: new Date().toISOString()
  }))
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
