import "reflect-metadata";
import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
import { db, pgp, users, articles, comments, favorites, follows } from "./db";

let typeDefs = gql`
  type User {
    username: String
    email: String
    bio: String
  }

  type Article {
    slug: String
    title: String
    description: String
    body: String
    tagList: [String]
    createdAt: String
    updatedAt: String
    favoritesCount: Int
    user_id: Int
  }

  type Query {
    users: [User]
  }

  type Mutation {
    addUser(username: String, email: String, bio: String): User
    addArticle(
      slug: String
      title: String
      description: String
      body: String
      tagList: [String]
      createdAt: String
      updatedAt: String
      favoritesCount: Int
      user_id: Int
    ): Article
  }
`;

let resolvers = {
  Query: {
    users: async () => {
      return await db.any("SELECT * FROM users");
    }
  },
  Mutation: {
    addUser: async (parent: any, args: any) => {
      await db.any(users.add, [args.username, args.email, args.bio]);
      return { username: args.username, email: args.email, bio: args.bio };
    },
    addArticle: async (parent: any, args: any) => {
      await db.any(articles.add, [
        args.slug,
        args.title,
        args.description,
        args.body,
        args.tagList,
        args.createdAt,
        args.updatedAt,
        args.favoritesCount,
        args.user_id
      ]);
      return {
        slug: args.slug,
        title: args.title,
        description: args.description,
        body: args.body,
        tagList: args.tagList,
        createdAt: args.createdAt,
        updatedAt: args.updatedAt,
        favoritesCount: args.favoritesCount,
        user_id: args.user_id
      };
    }
  }
};

(async () => {
  await db.any(favorites.create);
  await db.any(follows.create);
  let app = express();

  let apolloServer = new ApolloServer({ typeDefs, resolvers });

  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(4000, () => console.log("Server started"));
})();
