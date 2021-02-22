import '../styles/globals.sass';

import { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps): any {
  return <Component {...pageProps} />;
}
