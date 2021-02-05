import React from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

import Layout from '../../components/Layout';
import { GetStaticPaths, GetStaticProps } from 'next';

const MicroCmsApiEndpoint = process.env.MICRO_CMS_API_ENDPOINT;
const MicroCmsApiKey = process.env.MICRO_CMS_API_KEY;

type PostProps = {
  data: {
    title: string;
    body: string;
    publishedAt: string;
  };
};

/**
 * ブログ記事ページ
 * @param data
 */
const PostPage: React.FC<PostProps> = ({ data }) => (
  <Layout title="yanao.dev">
    <div className="uk-container uk-container-small">
      <article>
        <h1>{data.title}</h1>
        <p>{data.publishedAt}</p>
        <ReactMarkdown>{data.body}</ReactMarkdown>
      </article>
    </div>
  </Layout>
);

/**
 * ダイナミックルーティングのSSGの際に、ルーティングに対するパスを設定する
 */
export const getStaticPaths: GetStaticPaths = async () => {
  const res = await axios.get(`${MicroCmsApiEndpoint}/posts`, {
    headers: {
      'X-API-KEY': MicroCmsApiKey,
    },
  });
  const paths = res.data.contents.map((content: any) => {
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
  const data = res.data;

  return {
    props: {
      data,
    },
  };
};

export default PostPage;
