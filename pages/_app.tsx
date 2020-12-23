import 'tailwindcss/tailwind.css';

import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../lib/apollo-client';
import { AppProps } from 'next/app';

export type PageProps = {
  initialApolloState: any;
};

export default function App({ Component, pageProps }: AppProps<PageProps>) {
  const apolloClient = useApollo(pageProps.initialApolloState);
  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
