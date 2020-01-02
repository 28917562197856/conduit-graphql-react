import { gql } from "apollo-server-express";

export let typeDefs = gql`
  type User {
    username: String
    email: String
    bio: String
    image: String
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

  type Comment {
    createdAt: String
    updatedAt: String
    body: String
    author_id: Int
    article_id: Int
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
