import { db, sql } from "../db";

async function users() {
  return await db.any("SELECT * FROM users");
}

async function addUser(parent: any, args: any) {
  await db.one(sql.users.add, [args.username, args.email, args.bio]);
  return { username: args.username, email: args.email, bio: args.bio };
}

async function addArticle(parent: any, args: any) {
  await db.one(sql.articles.add, [
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

export let resolvers = {
  Query: {
    users
  },
  Mutation: {
    addUser,
    addArticle
  }
};
