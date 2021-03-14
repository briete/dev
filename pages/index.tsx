import * as luxon from 'luxon';
import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import Link from 'next/link';
import { getPosts } from '../api/cms';
import Layout from '../components/Layout';
import { Content } from '../types/micro-cms-type';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export const getStaticProps: GetStaticProps = async () => {
  const data = await getPosts();
  return {
    props: {
      data,
    },
  };
};

const IndexPage: NextPage<Props> = ({ data }) => {
  return (
    <Layout title="briete.dev">
      <div
        className="container is-max-desktop"
        style={{ marginTop: '16px', marginBottom: '16px' }}
      >
        {data.contents.map((content: Content) => (
          <div key={content.id}>
            <p>
              {luxon.DateTime.fromISO(content.publishedAt).toISO() + ' '}
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

export default IndexPage;
