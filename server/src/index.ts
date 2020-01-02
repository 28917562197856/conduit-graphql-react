import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { resolvers } from "./graphql/resolvers";
import { typeDefs } from "./graphql/schema";

(async () => {
  let app = express();

  let apolloServer = new ApolloServer({
    typeDefs,
    resolvers
  });

  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(4000, () => console.log("Server started"));
})();
