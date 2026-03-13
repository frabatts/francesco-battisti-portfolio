import { fetchGraphQL } from "@/lib/graphql/client";
import { GET_POST_BY_SLUG, GET_ALL_POSTS } from "@/lib/graphql/queries/posts";
import PageTemplate from "@/components/ui/PageTemplate";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface SEO {
  title: string;
  description: string;
  canonicalUrl: string;
  openGraph: {
    title: string;
    description: string;
  };
}

interface PostData {
  post: {
    id: string;
    title: string;
    slug: string;
    content: string;
    date: string;
    seo: SEO;
  } | null;
}

interface AllPostsData {
  posts: {
    nodes: { slug: string }[];
  };
}

export async function generateStaticParams() {
  const data = await fetchGraphQL<AllPostsData>(GET_ALL_POSTS);
  return data?.posts?.nodes.map((p) => ({ slug: p.slug })) ?? [];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = await fetchGraphQL<PostData>(GET_POST_BY_SLUG, { slug });

  if (!data?.post) return { title: "Post non trovato" };

  const { seo } = data.post;

  return {
    title: seo?.title || data.post.title,
    description: seo?.description,
    alternates: { canonical: seo?.canonicalUrl },
    openGraph: {
      title: seo?.openGraph?.title || data.post.title,
      description: seo?.openGraph?.description,
      type: "article",
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await fetchGraphQL<PostData>(GET_POST_BY_SLUG, { slug });

  if (!data?.post) notFound();

  return (
    <PageTemplate
      title={data.post.title}
      content={data.post.content}
      date={data.post.date}
    />
  );
}