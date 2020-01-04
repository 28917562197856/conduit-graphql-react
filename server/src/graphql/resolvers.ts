import { db, sql } from "../db";
import bcrypt from "bcrypt";
import { newAccessToken, newRefreshToken } from "../auth";
import { AuthenticationError } from "apollo-server-express";
import { MutationResolvers, QueryResolvers } from "../generated";
import { Context } from "..";
import { articles } from "../db/repos/articles";
import { comments } from "../db/repos/comments";
import { favorites } from "../db/repos/favorites";
import { users } from "../db/repos/users";

let Queries: QueryResolvers<Context> = {
  users: async () => {
    return await db.any("SELECT * FROM users");
  },
  hi: async (_, __, context) => {
    if (!context.user) throw new AuthenticationError("Not authenticated");
    return `your user id is: ${context.user.userId}`;
  },
  getProfile: async (_, args) => {
    let user: any = await users.find(args.username);
    console.log(user);
    return user;
  },
  getArticles: async (_, args) => {
    let articles = await db.any("SELECT * FROM articles");
    return articles;
  },
  getArticle: async (_, args) => {
    let article = await articles.find(args.slug);
    return article;
  },
  getComments: async (_, args) => {
    let { id } = await articles.find(args.slug);
    let result = await comments.findAll(id);
    return result;
  },
  getTags: async () => {
    let tags = await db.any('SELECT "tagList" from articles');
    tags = tags.flatMap(x => x.tagList);
    let uniqueTags: any = [...new Set(tags)];
    return uniqueTags;
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
  addArticle: async (_, args, context) => {
    if (!context.user) throw new AuthenticationError("Not authenticated");

    let article = await articles.add({
      slug: args.title
        .toLowerCase()
        .split(" ")
        .join("-"),
      title: args.title,
      description: args.description,
      body: args.body,
      tagList: args.tagList,
      createdAt: new Date().toUTCString(),
      updatedAt: new Date().toUTCString(),
      favoritesCount: 0,
      userId: args.userId
    });

    return article;
  },
  updateArticle: async (_, args, context) => {
    if (!context.user) throw new AuthenticationError("Not authenticated");

    let vars: object = { updatedAt: new Date().toUTCString() };
    if (args.title)
      vars = {
        ...vars,
        title: args.title,
        slug: args.title
          .toLowerCase()
          .split(" ")
          .join("-")
      };
    if (args.description) vars = { ...vars, description: args.description };
    if (args.body) vars = { ...vars, body: args.body };

    let article = await articles.update(args.slug, vars);
    return article;
  },
  deleteArticle: async (_, args, context) => {
    if (!context.user) throw new AuthenticationError("Not authenticated");

    let article = await articles.remove(args.slug);
    return article;
  },
  addComment: async (_, args, context) => {
    if (!context.user) throw new AuthenticationError("Not authenticated");

    let { id } = await articles.find(args.slug);

    let comment = {
      createdAt: new Date().toUTCString(),
      body: args.body,
      userId: context.user.userId,
      articleId: id
    };

    await comments.add(comment);
    return comment;
  },
  deleteComment: async (_, args, context) => {
    if (!context.user) throw new AuthenticationError("Not authenticated");

    let comment = await comments.remove(args.id);
    return comment;
  },
  favoriteArticle: async (_, args, context) => {
    if (!context.user) throw new AuthenticationError("Not authenticated");

    let article = await articles.find(args.slug);

    let favorite = {
      userId: context.user.userId,
      articleId: article.id
    };

    await favorites.add(favorite);

    return article;
  },
  unfavoriteArticle: async (_, args, context) => {
    if (!context.user) throw new AuthenticationError("Not authenticated");

    let article = await articles.find(args.slug);

    let favorite = {
      userId: context.user.userId,
      articleId: article.id
    };

    await favorites.remove(favorite);

    return article;
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
