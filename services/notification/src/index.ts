
import amqp from 'amqplib';

async function consumeMessages() {
  try {
    const connection = await amqp.connect('amqp://guest:guest@rabbitmq:5672');
    const channel = await connection.createChannel();

    const queue = 'user_created_queue';
    await channel.assertQueue(queue, { durable: false });

    console.log(`[*] Waiting for messages in ${queue}. To exit press CTRL+C`);

    channel.consume(queue, (msg) => {
      if (msg) {
        console.log(`[x] Received: ${msg.content.toString()}`);
        // Process the message here (e.g., send a notification)
      }
    }, { noAck: true });
  } catch (error) {
    console.error('Error consuming messages:', error);
    // Implement a retry mechanism if needed
    setTimeout(consumeMessages, 5000); // Retry after 5 seconds
  }
}

consumeMessages();
