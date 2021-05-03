import express from "express";
import http from "http";
import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers, dataSources } from "./schema";
import dbConnection from "./db/connection";
import amqpSub from "./amqp";

async function startApolloServer(pubsub) {
  const PORT = 4000;
  const app = express();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    subscriptions: {
      path: "/subscriptions",
      onConnect: (connectionParams, webSocket, context) => ({
        pubsub,
      }),
    },
    dataSources: () => ({
      pubsub,
      heroAPI: new dataSources.HeroAPI(),
    }),
  });
  await server.start();

  server.applyMiddleware({ app });

  const httpServer = http.createServer(app);
  server.installSubscriptionHandlers(httpServer);

  // Make sure to call listen on httpServer, NOT on app.
  await new Promise((resolve) => httpServer.listen(PORT, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
  console.log(
    `🚀 Server ready at http://localhost:4000${server.subscriptionsPath}`
  );
  return { server, app, httpServer };
}

dbConnection()
  .then((result) => console.log(result))
  .then(() => amqpSub().then((pubsub) => startApolloServer(pubsub)))
  .catch((err) => console.log(err));
