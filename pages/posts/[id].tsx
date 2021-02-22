import React from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { Prism } from 'react-syntax-highlighter';
import gfm from 'remark-gfm';
import coy from 'react-syntax-highlighter/dist/cjs/styles/prism/coy';

import Layout from '../../components/Layout';
import { GetStaticPaths, GetStaticProps } from 'next';
import { Content } from '..';

const MicroCmsApiEndpoint = process.env.MICRO_CMS_API_ENDPOINT;
const MicroCmsApiKey = process.env.MICRO_CMS_API_KEY;

type PostProps = {
  article: {
    title: string;
    body: string;
    publishedAt: string;
  };
};

type PrismRenderProps = {
  value: string;
  language: string;
};

const PrismRender: React.FC<PrismRenderProps> = ({ value, language }) => (
  <Prism language={language} style={coy}>
    {value}
  </Prism>
);

/**
 * ブログ記事ページ
 * @param article 記事
 */
const PostPage: React.FC<PostProps> = ({ article }) => (
  <Layout title="briete.dev">
    <div className="container is-max-desktop">
      <article className="content">
        <h1>{article.title}</h1>
        <ReactMarkdown
          plugins={[gfm]}
          renderers={{
            code: PrismRender,
          }}
        >
          {article.body}
        </ReactMarkdown>
      </article>
    </div>
  </Layout>
);

/**
 * ダイナミックルーティングのSSGの際に、ルーティングに対するパスを設定する
 */
export const getStaticPaths: GetStaticPaths = async () => {
  const res = await axios.get(`${MicroCmsApiEndpoint}/posts?limit=100`, {
    headers: {
      'X-API-KEY': MicroCmsApiKey,
    },
  });
  const paths = res.data.contents.map((content: Content) => {
    return { params: { id: content.id } };
  });

  return {
    paths,
    fallback: false,
  };
};

/**
 * SSG microCMSから記事データを取得する
 */
export const getStaticProps: GetStaticProps = async (context) => {
  const res = await axios.get(
    `${MicroCmsApiEndpoint}/posts/${context.params?.id}`,
    {
      headers: {
        'X-API-KEY': MicroCmsApiKey,
      },
    }
  );
  const article = res.data;

  return {
    props: {
      article,
    },
  };
};

export default PostPage;
