import { db, sql } from "../db";
import bcrypt from "bcrypt";
import { newAccessToken, newRefreshToken } from "../auth";
import { AuthenticationError } from "apollo-server-express";
import { MutationResolvers, QueryResolvers } from "src/generated";
import { Context } from "..";

let Queries: QueryResolvers<Context> = {
  users: async () => {
    return await db.any("SELECT * FROM users");
  },
  hi: async (_, __, context) => {
    if (!context.user) throw new AuthenticationError("Not authorized");
    return `your user id is: ${context.user.userId}`;
  },
  getArticles: async (_, args) => {
    let articles = await db.any("SELECT * FROM articles");
    console.log(articles);
    return articles;
  }
};

let Mutations: MutationResolvers<Context> = {
  register: async (_, args, context) => {
    let hash = await bcrypt.hash(args.password, 12);

    let user = await db.one(sql.users.add, [
      args.username,
      args.email,
      hash,
      null,
      null
    ]);
    return user;
  },
  login: async (_, args, context) => {
    let user = await db.one(sql.users.find, args.email);
    let valid = await bcrypt.compare(args.password, user.password);
    if (!valid) throw new Error("Invalid password");

    context.res.cookie("jid", newRefreshToken(user), { httpOnly: true });

    return {
      ...user,
      token: newAccessToken(user)
    };
  },
  addArticle: async (_, args) => {
    let article = await db.one(sql.articles.add, Object.values(args));
    return article;
  }
};

export let resolvers = {
  Query: Queries,
  Mutation: Mutations
};
