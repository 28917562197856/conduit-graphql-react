import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  Upload: any,
};


export type Article = {
   __typename?: 'Article',
  slug?: Maybe<Scalars['String']>,
  title?: Maybe<Scalars['String']>,
  description?: Maybe<Scalars['String']>,
  body?: Maybe<Scalars['String']>,
  taglist?: Maybe<Array<Maybe<Scalars['String']>>>,
  createdat?: Maybe<Scalars['String']>,
  updatedat?: Maybe<Scalars['String']>,
  favoritescount?: Maybe<Scalars['Int']>,
  user_id?: Maybe<Scalars['Int']>,
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}

export type Comment = {
   __typename?: 'Comment',
  createdat?: Maybe<Scalars['String']>,
  updatedat?: Maybe<Scalars['String']>,
  body?: Maybe<Scalars['String']>,
  author_id?: Maybe<Scalars['Int']>,
  article_id?: Maybe<Scalars['Int']>,
};

export type Mutation = {
   __typename?: 'Mutation',
  register?: Maybe<User>,
  login?: Maybe<User>,
  addArticle?: Maybe<Article>,
};


export type MutationRegisterArgs = {
  username: Scalars['String'],
  email: Scalars['String'],
  password: Scalars['String']
};


export type MutationLoginArgs = {
  email: Scalars['String'],
  password: Scalars['String']
};


export type MutationAddArticleArgs = {
  slug: Scalars['String'],
  title: Scalars['String'],
  description: Scalars['String'],
  body: Scalars['String'],
  taglist?: Maybe<Array<Maybe<Scalars['String']>>>,
  createdat?: Maybe<Scalars['String']>,
  updatedat?: Maybe<Scalars['String']>,
  favoritescount?: Maybe<Scalars['Int']>,
  user_id: Scalars['Int']
};

export type Query = {
   __typename?: 'Query',
  users?: Maybe<Array<Maybe<User>>>,
  hi?: Maybe<Scalars['String']>,
  getArticles?: Maybe<Array<Maybe<Article>>>,
};


export type QueryGetArticlesArgs = {
  tag?: Maybe<Scalars['String']>,
  author?: Maybe<Scalars['String']>,
  favorited?: Maybe<Scalars['String']>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>
};


export type User = {
   __typename?: 'User',
  email: Scalars['String'],
  token?: Maybe<Scalars['String']>,
  username: Scalars['String'],
  bio?: Maybe<Scalars['String']>,
  image?: Maybe<Scalars['String']>,
};

export type GetArticlesQueryVariables = {};


export type GetArticlesQuery = (
  { __typename?: 'Query' }
  & { getArticles: Maybe<Array<Maybe<(
    { __typename?: 'Article' }
    & Pick<Article, 'user_id' | 'createdat' | 'title' | 'description' | 'slug' | 'taglist'>
  )>>> }
);

export type UsersQueryVariables = {};


export type UsersQuery = (
  { __typename?: 'Query' }
  & { users: Maybe<Array<Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'username' | 'email' | 'token' | 'bio'>
  )>>> }
);


export const GetArticlesDocument = gql`
    query getArticles {
  getArticles {
    user_id
    createdat
    title
    description
    slug
    taglist
  }
}
    `;

/**
 * __useGetArticlesQuery__
 *
 * To run a query within a React component, call `useGetArticlesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetArticlesQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetArticlesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetArticlesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetArticlesQuery, GetArticlesQueryVariables>) {
        return ApolloReactHooks.useQuery<GetArticlesQuery, GetArticlesQueryVariables>(GetArticlesDocument, baseOptions);
      }
export function useGetArticlesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetArticlesQuery, GetArticlesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetArticlesQuery, GetArticlesQueryVariables>(GetArticlesDocument, baseOptions);
        }
export type GetArticlesQueryHookResult = ReturnType<typeof useGetArticlesQuery>;
export type GetArticlesLazyQueryHookResult = ReturnType<typeof useGetArticlesLazyQuery>;
export type GetArticlesQueryResult = ApolloReactCommon.QueryResult<GetArticlesQuery, GetArticlesQueryVariables>;
export const UsersDocument = gql`
    query Users {
  users {
    username
    email
    token
    bio
  }
}
    `;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useUsersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
        return ApolloReactHooks.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, baseOptions);
      }
export function useUsersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, baseOptions);
        }
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = ApolloReactCommon.QueryResult<UsersQuery, UsersQueryVariables>;