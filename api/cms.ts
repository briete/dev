import axios from 'axios';
import { Content, Tag } from '../types/micro-cms-type';

const MicroCmsApiEndpoint = process.env.MICRO_CMS_API_ENDPOINT;
const MicroCmsApiKey = process.env.MICRO_CMS_API_KEY;

type Post = {
  title: string;
  body: string;
  tags: Tag[];
  publishedAt: string;
};

type Posts = {
  contents: Content[];
  totalCount: number;
  offset: number;
  limit: number;
};

export async function getPosts(): Promise<Posts> {
  const res = await axios.get(`${MicroCmsApiEndpoint}/posts?limit=100`, {
    headers: {
      'X-API-KEY': MicroCmsApiKey,
    },
  });
  return res.data;
}

export async function getPost(id: string): Promise<Post> {
  const res = await axios.get(`${MicroCmsApiEndpoint}/posts/${id}`, {
    headers: {
      'X-API-KEY': MicroCmsApiKey,
    },
  });
  return res.data;
}
