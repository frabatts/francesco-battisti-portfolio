import { fetchGraphQL } from "@/lib/graphql/client";
import { GET_POST_BY_SLUG } from "@/lib/graphql/queries/posts";
import PageTemplate from "@/components/ui/PageTemplate";
import { notFound } from "next/navigation";

interface PostData {
  post: {
    id: string;
    title: string;
    slug: string;
    content: string;
    date: string;
  } | null;
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const data = await fetchGraphQL<PostData>(GET_POST_BY_SLUG, { slug });

  if (!data?.post) {
    notFound();
  }

  return (
    <PageTemplate
      title={data.post.title}
      content={data.post.content}
    />
  );
}