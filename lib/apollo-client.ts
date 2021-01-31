import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { useMemo } from 'react';

const MicroCmsGraphQLApi = process.env.MICROCMS_GRAPHQL_API!;
const MicroCmsApiKey = process.env.MICROCMS_API_KEY!;

let apolloClient: any;

function createApolloClient(): ApolloClient<any> {
  // ContentfulのGraphQL APIを設定
  const httpLink = createHttpLink({
    uri: MicroCmsGraphQLApi,
  });

  // Contentfulのアクセストークンを設定
  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: MicroCmsApiKey ? `Bearer ${MicroCmsApiKey}` : '',
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

  // ページにApollo Clientを使用したNext.jsのデータ取得メソッドがある場合
  if (initialState) {
    // クライアント側のデータ取得中に読み込まれた既存のキャッシュを取得します
    const existingCache = _apolloClient.extract();

    // getStaticProps/getServerSideProps から渡されたデータと既存のキャッシュデータを組み合わせてキャッシュを復元します。
    _apolloClient.cache.restore({ ...existingCache, ...initialState });
  }

  // SSGとSSRでは、常に新しいApollo Clientを作成します
  if (typeof window === 'undefined') return _apolloClient;

  // クライアントで一度 apollo client を作成
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
