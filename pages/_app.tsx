import '../styles/globals.scss';

import { AppProps } from 'next/app';

const App: any = ({ Component, pageProps }: AppProps) => (
  <Component {...pageProps} />
);

export default App;
