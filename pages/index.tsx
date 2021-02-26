import axios from 'axios';
import * as luxon from 'luxon';

import { GetStaticProps } from 'next';
import Link from 'next/link';
import Layout from '../components/Layout';

const MicroCmsApiEndpoint = process.env.MICRO_CMS_API_ENDPOINT;
const MicroCmsApiKey = process.env.MICRO_CMS_API_KEY;

export type Content = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  title: string;
  body: string;
};

type IndexProps = {
  data: {
    contents: Content[];
    totalCount: number;
    offset: number;
    limit: number;
  };
};

const IndexPage: React.FC<IndexProps> = ({ data }) => {
  return (
    <Layout title="briete.dev">
      <div
        className="container is-max-desktop"
        style={{ marginTop: '16px', marginBottom: '16px' }}
      >
        {data.contents.map((content) => (
          <div key={content.id}>
            <p>
              {luxon.DateTime.fromISO(content.publishedAt).toISODate() + ' '}
              <Link href={`/posts/${content.id}`}>
                <a>{content.title}</a>
              </Link>
            </p>
          </div>
        ))}
      </div>
    </Layout>
  );
};

// 記事一覧を取得する
export const getStaticProps: GetStaticProps = async () => {
  const res = await axios.get(`${MicroCmsApiEndpoint}/posts?limit=100`, {
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
