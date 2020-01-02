import { db, sql } from "../db";
import bcrypt from "bcrypt";
import { newAccessToken, newRefreshToken } from "../auth";
import { IResolvers, AuthenticationError } from "apollo-server-express";

async function users() {
  console.log("TEST");
  return await db.any("SELECT * FROM users");
}

async function addUser(parent: any, args: any) {
  let hash = await bcrypt.hash(args.password, 12);

  let user = await db.one(sql.users.add, [
    args.username,
    args.email,
    hash,
    args.bio,
    args.image
  ]);
  return user;
}

async function login(_: any, args: any, context: any) {
  let user = await db.one(sql.users.find, args.email);
  let valid = await bcrypt.compare(args.password, user.password);
  if (!valid) throw new Error("Invalid password");

  context.res.cookie("jid", newRefreshToken(user), { httpOnly: true });

  return {
    ...user,
    token: newAccessToken(user)
  };
}

async function addArticle(parent: any, args: any) {
  let article = await db.one(sql.articles.add, Object.values(args));
  return article;
}

async function hi(parent: any, args: any, context: any) {
  if (!context.user) throw new AuthenticationError("Not authorized");
  return `your user id is: ${context.user.userId}`;
}

export let resolvers: IResolvers = {
  Query: {
    users,
    hi
  },
  Mutation: {
    addUser,
    addArticle,
    login
  }
};
