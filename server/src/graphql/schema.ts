import { gql } from "apollo-server-express";

export let typeDefs = gql`
  type User {
    email: String!
    token: String
    username: String!
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
    hi: String
  }

  type Mutation {
    register(username: String!, email: String!, password: String!): User
    login(email: String!, password: String!): User
    addArticle(
      slug: String!
      title: String!
      description: String!
      body: String!
      tagList: [String]
      createdAt: String
      updatedAt: String
      favoritesCount: Int
      user_id: Int!
    ): Article
  }
`;
