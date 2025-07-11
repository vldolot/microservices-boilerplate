import * as grpc from '@grpc/grpc-js';
import { UsersService, type UsersServer } from '@monorepo/shared/proto/generated/users/users';

// Mock user data
const users = new Map([
  ['1', { id: '1', name: 'Alice Johnson' }],
  ['2', { id: '2', name: 'Bob Smith' }],
  ['3', { id: '3', name: 'Charlie Brown' }],
]);

function startServer() {
  const server = new grpc.Server();

  const userServiceImplementation: UsersServer = {
    getUser: (call, callback) => {
      const { id } = call.request;

      console.log(`Received GetUser request for user_id: ${id}`);

      const user = users.get(id);

      if (!user) {
        return callback({
          code: grpc.status.NOT_FOUND,
          message: `User with ID ${id} not found`,
        } as any);
      }

      callback(null, user);
    },
  };

  server.addService(UsersService, userServiceImplementation);

  const port = '50051';
  server.bindAsync(`0.0.0.0:${port}`, grpc.ServerCredentials.createInsecure(), (err, port) => {
    if (err) {
      console.error('Failed to bind server:', err);
      return;
    }

    console.log(`User service listening on port ${port}`);
    server.start();
  });
}

startServer();