import { gql } from '@apollo/client';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Post = {
  __typename?: 'Post';
  body: Scalars['String'];
  createdAt: Scalars['String'];
  id: Scalars['String'];
  publishedAt: Scalars['String'];
  revisedAt: Scalars['String'];
  tags: Scalars['String'];
  title: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Posts = {
  __typename?: 'Posts';
  contents: Array<Post>;
  limit: Scalars['Int'];
  offset: Scalars['Int'];
  totalCount: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  post?: Maybe<Post>;
  posts?: Maybe<Posts>;
};

export type QueryPostArgs = {
  id: Scalars['ID'];
};

export type PostQueryVariables = Exact<{
  id: Scalars['ID'];
}>;

export type PostQuery = { __typename?: 'Query' } & {
  post?: Maybe<
    { __typename?: 'Post' } & Pick<
      Post,
      'body' | 'createdAt' | 'id' | 'publishedAt' | 'revisedAt' | 'tags' | 'title' | 'updatedAt'
    >
  >;
};

export type PostsQueryVariables = Exact<{ [key: string]: never }>;

export type PostsQuery = { __typename?: 'Query' } & {
  posts?: Maybe<
    { __typename?: 'Posts' } & Pick<Posts, 'limit' | 'offset' | 'totalCount'> & {
        contents: Array<
          { __typename?: 'Post' } & Pick<
            Post,
            'body' | 'createdAt' | 'id' | 'publishedAt' | 'revisedAt' | 'tags' | 'title' | 'updatedAt'
          >
        >;
      }
  >;
};

export const PostDocument = gql`
  query Post($id: ID!) {
    post(id: $id) {
      body
      createdAt
      id
      publishedAt
      revisedAt
      tags
      title
      updatedAt
    }
  }
`;

/**
 * __usePostQuery__
 *
 * To run a query within a React component, call `usePostQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePostQuery(baseOptions: ApolloReactHooks.QueryHookOptions<PostQuery, PostQueryVariables>) {
  return ApolloReactHooks.useQuery<PostQuery, PostQueryVariables>(PostDocument, baseOptions);
}
export function usePostLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PostQuery, PostQueryVariables>) {
  return ApolloReactHooks.useLazyQuery<PostQuery, PostQueryVariables>(PostDocument, baseOptions);
}
export type PostQueryHookResult = ReturnType<typeof usePostQuery>;
export type PostLazyQueryHookResult = ReturnType<typeof usePostLazyQuery>;
export type PostQueryResult = ApolloReactCommon.QueryResult<PostQuery, PostQueryVariables>;
export const PostsDocument = gql`
  query Posts {
    posts {
      contents {
        body
        createdAt
        id
        publishedAt
        revisedAt
        tags
        title
        updatedAt
      }
      limit
      offset
      totalCount
    }
  }
`;

/**
 * __usePostsQuery__
 *
 * To run a query within a React component, call `usePostsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostsQuery({
 *   variables: {
 *   },
 * });
 */
export function usePostsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<PostsQuery, PostsQueryVariables>) {
  return ApolloReactHooks.useQuery<PostsQuery, PostsQueryVariables>(PostsDocument, baseOptions);
}
export function usePostsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PostsQuery, PostsQueryVariables>
) {
  return ApolloReactHooks.useLazyQuery<PostsQuery, PostsQueryVariables>(PostsDocument, baseOptions);
}
export type PostsQueryHookResult = ReturnType<typeof usePostsQuery>;
export type PostsLazyQueryHookResult = ReturnType<typeof usePostsLazyQuery>;
export type PostsQueryResult = ApolloReactCommon.QueryResult<PostsQuery, PostsQueryVariables>;
