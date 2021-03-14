import ReactMarkdown from 'react-markdown';
import { Prism } from 'react-syntax-highlighter';
import gfm from 'remark-gfm';
import { darcula } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import Layout from '../../components/Layout';
import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from 'next';
import { Content, Tag } from '../../types/micro-cms-type';
import { getPost, getPosts } from '../../api/cms';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

type PrismRenderProps = {
  value: string;
  language: string;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await getPosts();
  const paths = data.contents.map((content: Content) => {
    return { params: { id: content.id } };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const post = await getPost((context.params?.id as string) ?? '');

  return {
    props: {
      post,
    },
  };
};

const PrismRender: React.FC<PrismRenderProps> = ({ value, language }) => (
  <Prism language={language} style={darcula}>
    {value}
  </Prism>
);

const PostPage: NextPage<Props> = ({ post }) => (
  <Layout title="briete.dev">
    <div className="container is-max-desktop">
      <section className="section">
        <article className="content">
          <h1>{post.title}</h1>
          <div className="tags">
            {post.tags.map((tag: Tag) => (
              <span key={tag.id} className="tag is-primary">
                {tag.name}
              </span>
            ))}
          </div>
          <ReactMarkdown
            plugins={[gfm]}
            renderers={{
              code: PrismRender,
            }}
          >
            {post.body}
          </ReactMarkdown>
        </article>
      </section>
    </div>
  </Layout>
);

export default PostPage;
