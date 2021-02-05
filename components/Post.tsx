import Link from 'next/link';

type PostProps = {
  id: string;
  title: string;
};

export const Post: React.FC<PostProps> = ({ id, title }) => {
  return (
    <div className="uk-card uk-card-hover uk-card-body">
      <Link href={`/posts/${id}`}>
        <a>
          <h3 className="uk-card-title">{title}</h3>
        </a>
      </Link>
    </div>
  );
};
