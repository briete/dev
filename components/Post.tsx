import Link from 'next/link';

type PostProps = {
  id: string;
  title: string;
};

export const Post: React.FC<PostProps> = ({ id, title }) => {
  return (
    <div>
      <Link href={`/posts/${id}`}>
        <a>
          <h3>{title}</h3>
        </a>
      </Link>
    </div>
  );
};
