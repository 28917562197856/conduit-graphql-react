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
  logout?: Maybe<Scalars['Boolean']>,
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

export type HiQueryVariables = {};


export type HiQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'hi'>
);

export type LoginMutationVariables = {
  email: Scalars['String'],
  password: Scalars['String']
};


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'token'>
  )> }
);

export type LogoutMutationVariables = {};


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type RegisterMutationVariables = {
  username: Scalars['String'],
  email: Scalars['String'],
  password: Scalars['String']
};


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'token'>
  )> }
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
export const HiDocument = gql`
    query Hi {
  hi
}
    `;

/**
 * __useHiQuery__
 *
 * To run a query within a React component, call `useHiQuery` and pass it any options that fit your needs.
 * When your component renders, `useHiQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHiQuery({
 *   variables: {
 *   },
 * });
 */
export function useHiQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<HiQuery, HiQueryVariables>) {
        return ApolloReactHooks.useQuery<HiQuery, HiQueryVariables>(HiDocument, baseOptions);
      }
export function useHiLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<HiQuery, HiQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<HiQuery, HiQueryVariables>(HiDocument, baseOptions);
        }
export type HiQueryHookResult = ReturnType<typeof useHiQuery>;
export type HiLazyQueryHookResult = ReturnType<typeof useHiLazyQuery>;
export type HiQueryResult = ApolloReactCommon.QueryResult<HiQuery, HiQueryVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
  }
}
    `;
export type LoginMutationFn = ApolloReactCommon.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return ApolloReactHooks.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = ApolloReactCommon.MutationResult<LoginMutation>;
export type LoginMutationOptions = ApolloReactCommon.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = ApolloReactCommon.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        return ApolloReactHooks.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, baseOptions);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = ApolloReactCommon.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = ApolloReactCommon.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($username: String!, $email: String!, $password: String!) {
  register(username: $username, email: $email, password: $password) {
    token
  }
}
    `;
export type RegisterMutationFn = ApolloReactCommon.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      username: // value for 'username'
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        return ApolloReactHooks.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, baseOptions);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = ApolloReactCommon.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = ApolloReactCommon.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
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