import { AMQPPubSub } from "graphql-amqp-subscriptions";
import amqp from "amqplib";
import dotenv from "dotenv";
dotenv.config();

const amqpSub = () =>
  new Promise((resolve, reject) =>
    amqp
      .connect(process.env.AMQP_SERVER)
      .then((conn) => {
        const pubsub = new AMQPPubSub({
          connection: conn,
          exchange: {
            name: "apollo-pubsub",
            type: "topic",
            options: {
              durable: false,
            },
          },
          queue: {
            name: "",
            options: {
              exclusive: true,
              durable: true,
            },
          },
        });
        return pubsub;
      })
      .then((pubsub) => resolve(pubsub))
      .catch((err) => reject(err))
  );

export default amqpSub;
