import React from 'react';
import axios from 'axios';

import Layout from '../../components/Layout';
import { GetStaticPaths, GetStaticProps } from 'next';

const MicroCmsApiEndpoint = process.env.MICRO_CMS_API_ENDPOINT!;
const MicroCmsApiKey = process.env.MICRO_CMS_API_KEY!;

type PostProps = {
  data: {
    title: string;
    tags: string;
    body: string;
  };
  loading: boolean;
};

/**
 * ブログ記事ページ
 * @param data
 */
const PostPage: React.FC<PostProps> = ({ data }) => (
  <Layout title="yanao.dev">
    <main>
      <h1>{data.title}</h1>
      <p>{data.tags}</p>
      <div
        dangerouslySetInnerHTML={{
          __html: data.body,
        }}
      />
    </main>
  </Layout>
);

/**
 * ダイナミックルーティングのSSGの際に、ルーティングに対するパスを設定する
 */
export const getStaticPaths: GetStaticPaths = async () => {
  // const apolloClient = initializeApollo();
  // const { data } = await apolloClient.query({
  //   query: PostsDocument,
  // });
  // console.log(data);
  // const paths = data.contents.map((content: any) => {
  //   return { params: content.id };
  // });

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
  // const apolloClient = initializeApollo();
  //
  // const { data, loading } = await apolloClient.query({
  //   query: PostDocument,
  //   variables: {
  //     id: context.params!.id,
  //   },
  // });

  const res = await axios.get(`${MicroCmsApiEndpoint}/posts/${context.params!.id}`, {
    headers: {
      'X-API-KEY': MicroCmsApiKey,
    },
  });
  const data = res.data;

  return {
    props: {
      data,
    },
  };
};

export default PostPage;
