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
    taglist: [String]
    createdat: String
    updatedat: String
    favoritescount: Int
    user_id: Int
  }

  type Comment {
    createdat: String
    updatedat: String
    body: String
    author_id: Int
    article_id: Int
  }

  type Query {
    users: [User]
    hi: String
    getArticles(
      tag: String
      author: String
      favorited: String
      limit: Int
      offset: Int
    ): [Article]
  }

  type Mutation {
    register(username: String!, email: String!, password: String!): User
    login(email: String!, password: String!): User
    addArticle(
      title: String!
      description: String!
      body: String!
      taglist: [String]
      user_id: Int!
    ): Article
    logout: Boolean
  }
`;
