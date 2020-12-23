import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { useMemo } from 'react';

const ContentfulGraphQLApi = process.env.CONTENTFUL_GRAPHQL_API!;
const ContentfulDeliveryAccessToken = process.env.CONTENTFUL_DELIVERY_ACCESS_TOKEN;

let apolloClient;

function createApolloClient(): ApolloClient<any> {
  // ContentfulのGraphQL APIを設定
  const httpLink = createHttpLink({
    uri: ContentfulGraphQLApi,
  });

  // Contentfulのアクセストークンを設定
  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: ContentfulDeliveryAccessToken ? `Bearer ${ContentfulDeliveryAccessToken}` : '',
      },
    };
  });

  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
}

export function initializeApollo(initialState: any = null): ApolloClient<any> {
  const _apolloClient = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client,
  // the initial state gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    // Restore the cache using the data passed from
    // getStaticProps/getServerSideProps combined with the existing cached data
    _apolloClient.cache.restore({ ...existingCache, ...initialState });
  }

  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient;

  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;
  return _apolloClient;
}

/**
 * ApolloClientを作成する
 * @param initialState
 */
export function useApollo(initialState: any) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}
