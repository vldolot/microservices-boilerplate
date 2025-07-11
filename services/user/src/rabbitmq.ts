import amqp from 'amqplib';

let channel: amqp.Channel;

export async function connectRabbitMQ() {
  try {
    const connection = await amqp.connect('amqp://guest:guest@rabbitmq:5672');
    channel = await connection.createChannel();
    console.log('Connected to RabbitMQ');
  } catch (error) {
    console.error('Error connecting to RabbitMQ:', error);
    // Implement a retry mechanism if needed
    setTimeout(connectRabbitMQ, 5000); // Retry after 5 seconds
  }
}

export async function publishMessage(queue: string, message: string) {
  if (!channel) {
    console.error('RabbitMQ channel not established. Message not sent.');
    return;
  }
  await channel.assertQueue(queue, { durable: false });
  channel.sendToQueue(queue, Buffer.from(message));
  console.log(`Sent message to ${queue}: ${message}`);
}
