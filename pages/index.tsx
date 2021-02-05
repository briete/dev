import axios from 'axios';

import { GetStaticProps } from 'next';
import Layout from '../components/Layout';
import { Post } from '../components/Post';

const MicroCmsApiEndpoint = process.env.MICRO_CMS_API_ENDPOINT;
const MicroCmsApiKey = process.env.MICRO_CMS_API_KEY;

type IndexProps = {
  data: {
    contents: [
      {
        id: string;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
        revisedAt: string;
        title: string;
        body: string;
      }
    ];
    totalCount: number;
    offset: number;
    limit: number;
  };
};

const IndexPage: React.FC<IndexProps> = ({ data }) => {
  return (
    <Layout title="yanao.dev">
      <div className="uk-container">
        <div
          data-uk-grid
          className="uk-child-width-1-4 uk-text-center uk-grid-small"
        >
          {data.contents.map((content) => (
            <Post key={content.id} id={content.id} title={content.title} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

// 記事一覧を取得する
export const getStaticProps: GetStaticProps = async () => {
  const res = await axios.get(`${MicroCmsApiEndpoint}/posts`, {
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

export default IndexPage;
