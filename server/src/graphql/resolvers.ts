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

    context.res.cookie("jid", newRefreshToken(user), {
      httpOnly: true,
      path: "/refresh_token",
      maxAge: 1000 * 60 * 60 * 24 * 7
    });
    return {
      ...user,
      token: newAccessToken(user)
    };
  },
  login: async (_, args, context) => {
    let user = await db.one(sql.users.find, args.email);
    let valid = await bcrypt.compare(args.password, user.password);
    if (!valid) throw new Error("Invalid password");

    context.res.cookie("jid", newRefreshToken(user), {
      httpOnly: true,
      path: "/refresh_token",
      maxAge: 1000 * 60 * 60 * 24 * 7
    });

    return {
      ...user,
      token: newAccessToken(user)
    };
  },
  addArticle: async (_, args) => {
    console.log(args);
    let article = {
      slug: args.title
        .toLowerCase()
        .split(" ")
        .join("-"),
      title: args.title,
      description: args.description,
      body: args.body,
      taglist: args.taglist,
      createdat: new Date().toUTCString(),
      updatedat: new Date().toUTCString(),
      favoritescount: 0,
      user_id: args.user_id
    };
    let articleDb = await db.one(sql.articles.add, Object.values(article));
    console.log(articleDb);
    return articleDb;
  },
  logout: async (_, __, context) => {
    context.res.cookie("jid", "", {
      httpOnly: true,
      path: "/refresh_token"
    });

    return true;
  }
};

export let resolvers = {
  Query: Queries,
  Mutation: Mutations
};
