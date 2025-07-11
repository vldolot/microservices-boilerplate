import { Elysia } from 'elysia';
import './grpc';
import { connectRabbitMQ, publishMessage } from './rabbitmq';
import { apollo } from '@elysiajs/apollo';

const app = new Elysia()
  .use(
    // Use Apollo for GraphQL support
    apollo({
      typeDefs: `
        type Query {
          hi: String
        }
      `,
      resolvers: {
        Query: {
          hi: () => 'Hello from Apollo'
        }
      }
    })
  )
  // Basic HTTP endpoint
  .get('/', () => 'Hello, World!')
  // Define a simple WebSocket endpoint
  .ws('/ws', {
    message(ws, message) {
      ws.send(message);
    }
  })
  // Define a REST endpoint to create a user
  // This endpoint will publish a message to RabbitMQ when a user is created
  .post('/users/create', async ({ body }) => {
    const user = { id: Math.random().toString(36).substring(7), name: body.name };
    await publishMessage('user_created_queue', JSON.stringify(user));
    return user;
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

// Connect to RabbitMQ
connectRabbitMQ();

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
