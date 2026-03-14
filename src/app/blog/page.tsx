import { fetchGraphQL } from "@/lib/graphql/client";
import { GET_ALL_POSTS } from "@/lib/graphql/queries/posts";
import BlogClient from "@/components/ui/BlogClient";
import type { Post } from "@/types/wordpress";

interface PostsData {
  posts: {
    nodes: Post[];
  };
}

export default async function BlogPage() {
  const data = await fetchGraphQL<PostsData>(GET_ALL_POSTS, undefined, 1800);
  const posts = data?.posts?.nodes ?? [];

  return <BlogClient posts={posts} />;
}