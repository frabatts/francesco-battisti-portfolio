import { fetchGraphQL } from "@/lib/graphql/client";
import { GET_ALL_POSTS } from "@/lib/graphql/queries/posts";
import BlogClient from "@/components/ui/BlogClient";

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  featuredImage?: {
    node: {
      sourceUrl: string;
      altText: string;
    };
  };
}

interface PostsData {
  posts: {
    nodes: Post[];
  };
}

export default async function BlogPage() {
  const data = await fetchGraphQL<PostsData>(GET_ALL_POSTS);
  const posts = data?.posts?.nodes ?? [];

  return <BlogClient posts={posts} />;
}