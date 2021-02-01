import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { useMemo } from 'react';

const AppSyncGraphQLApi = process.env.APPSYNC_GRAPHQL_API!;
const MicroCmsApiKey = process.env.MICRO_CMS_API_KEY!;

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__';

let apolloClient: any;

function createApolloClient(): ApolloClient<any> {
  // AppSyncのGraphQL APIを設定
  const httpLink = createHttpLink({
    uri: AppSyncGraphQLApi,
  });

  // MicroCMSのアクセストークンを設定
  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        'X-API-KEY': MicroCmsApiKey ?? '',
      },
    };
  });

  // ApolloClientのインスタンスを作成
  // Apollo Linkを使って、AuthLinkとHttpLinkをConcatする
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

export function addApolloState(client: ApolloClient<any>, pageProps: any) {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
  }

  return pageProps;
}

/**
 * ApolloClientを作成する
 * @param initialState
 */
export function useApollo(initialState: any) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}
