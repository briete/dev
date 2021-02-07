import '../styles/globals.css';

import { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps): any {
  return <Component {...pageProps} />;
}
