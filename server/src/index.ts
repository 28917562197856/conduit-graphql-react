import "reflect-metadata";
import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
import { db, pgp } from "./db";
import { users } from "./db/sql";

let typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type User {
    username: String
    email: String
    bio: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    users: [User]
  }
`;

let resolvers = {
  Query: {
    users: async () => {
      return await db.any("SELECT * FROM users");
    }
  }
};

(async () => {
  console.log(await db.any("SELECT * FROM users"));
  let app = express();

  let apolloServer = new ApolloServer({ typeDefs, resolvers });

  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(4000, () => console.log("Server started"));
})();
