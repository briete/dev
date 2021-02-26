import React, { ReactNode } from 'react';
import Head from 'next/head';
import { Header } from './Header';
import { Footer } from './Footer';

import '@fortawesome/fontawesome-free/css/all.css';

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout: React.FC<Props> = ({ children, title }) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <Header />
    {children}
    <Footer />
  </div>
);

export default Layout;
